import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/postgresql/user.entity';
import { UserRepository } from '../repository/user.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { LogService } from './log.service';
import { PasswordDTO } from './dto/password-dto.dto';
import { RoleType } from '../security';
import { PasswordResetDTO } from './dto/password-reset-dto.dto';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';
import { MailService } from './mail.service';
import { UserLogService } from './user-log.service';
import { UserDTO } from './dto/user-dto.dto';
import { plainToClass } from 'class-transformer';
import { UserDocumentService } from './user-document.service';
import { UserDocumentDTO } from './dto/user-document-dto.dto';
import { UserDocument } from '../domain/postgresql/user-document.entity';

const relationshipNames = [];

@Injectable()
export class UserService {

  logger = new Logger('UserService');
  entity = 'USER';

  constructor(
    @InjectRepository(UserRepository) private _userRepository: UserRepository,
    private _userLogService: UserLogService,
    private _logService: LogService,
    private _mailService: MailService,
    private _userDocumentService: UserDocumentService
  ) { }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /* 
  -----------------------------------------------------------------------------------------------------
  @ Method for controller USER
  -----------------------------------------------------------------------------------------------------
  */


  /**
   * Method to find all user with pagination
   *
   * @param {FindManyOptions<UserDTO>} options
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {(Promise<[UserDTO[] | User[], number]>)}
   * @memberof UserService
   */
  public async findAndCount(options: FindManyOptions<any>, currentUser: any, remoteIP: string): Promise<[any, number]> {
    options.relations = ['authorities', 'mailSetting', 'document'];
    const resultList = await this._userRepository.findAndCount(options);
    const users = [];
    if (resultList && resultList[0]) {

      for (let index = 0; index < resultList[0].length; index++) {
        let user = resultList[0][index];
        let userDocumentDTO: UserDocumentDTO = await this._userDocumentService.findByUserId(user.id);
        user = this._flatAuthorities(user);
        let userView;
        if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
          user.password = null;
          user.resetKey = null;
          user.document = null;
          if (userDocumentDTO) {
            user.document = (plainToClass(UserDocument, userDocumentDTO));
          }
          userView = user;
        } else {
          userView = plainToClass(UserDTO, user);
          userView.document = null;
          if (userDocumentDTO) {
            userView.document = userDocumentDTO
          }
        }
        users.push(userView);
      }

      resultList[0] = users;
    }

    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'All USER with all entity', null, null, null, null, currentUser);
    } else {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'All USER with restricted entity', null, null, null, null, currentUser);
    }

    return resultList;
  }

  /**
   * Method to find user by login
   *
   * @param {string} loginValue
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {Promise<UserDTO>}
   * @memberof UserService
   */
  public async findByLogin(loginValue: string, currentUser: any, remoteIP: string): Promise<UserDTO | User> {

    if (currentUser.login !== loginValue && !currentUser.authorities.includes(RoleType.SUPER_ADMIN)) {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.NOT_AUTHORIZED, remoteIP, 'User : (' + loginValue + ') not permession to view this login', null, null, null, null, currentUser);
      throw new HttpException('You don\'nt have permession.', HttpStatus.BAD_REQUEST);
    }

    relationshipNames.push('authorities');
    let result = await this._userRepository.findOne({
      where: {
        login: loginValue,
      },
      relations: relationshipNames
    });

    if (!result) {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') not found', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (result.isArchived) {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') is archived', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (!result.isActivated) {
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') is not active', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let userDocumentDTO: UserDocumentDTO = await this._userDocumentService.findByUserId(result.id);
    result = this._flatAuthorities(result);
    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      result.password = null;
      result.resetKey = null;
      result.document = null;
      if (userDocumentDTO) {
        result.document = (plainToClass(UserDocument, userDocumentDTO));
      }
      userView = result;
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'User : (' + loginValue + ') viewed restirected entity', null, null, result.id, null, currentUser);
    } else {
      userView = plainToClass(UserDTO, result);
      userView.document = null;
      if (userDocumentDTO) {
        userView.document = userDocumentDTO;
      }
      this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'User : (' + loginValue + ') viewed all entity', null, null, result.id, null, currentUser);
    }

    return userView;
  }

  /**
   * Method to save user with log
   *
   * @param {User} user
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async create(user: User, currentUser: any, remoteIP: string): Promise<User | UserDTO> {
    user = this._convertInAuthorities(user);
    user = this._logService.logOnCreate(user, currentUser);
    user.password = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    console.log(user.password);

    const result: User = await this._userRepository.save(user);
    let userDocument: UserDocument = user.document[0];
    if (userDocument) {
      userDocument.user = result;
      userDocument.path = '/' + result.login;
      let date = new Date(Date.now()).toISOString().substring(0, 19);
      userDocument.fileName = result.login + '-' + date.replace(/:/g, '-') + userDocument.name.slice(userDocument.name.toString().indexOf('.'));
      await this._userDocumentService.create(userDocument, currentUser);
    }
    this._logService.saveLog(LogType.USER, LogAction.CREATE, this.entity, LogOperation.SUCCESS, remoteIP, "New user", null, null, result.id, null, currentUser);
    await this._mailService.sendCreateUser(result);
    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      userView = result;
      userView.password = null;
      userView.resetKey = null;
    } else {
      userView = plainToClass(UserDTO, result);
    }
    return userView;
  }

  /**
   * Method to update user with log
   *
   * @param {User} user
   * @param {*} currentUser
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async updateUser(user: User, currentUser: any, remoteIP: string): Promise<User> {
    let newUser = user;
    user = this._convertInAuthorities(user);
    user = this._logService.logOnUpdate(user, currentUser);
    let oldUser: User = await this._userRepository.findOne({
      relations: ["document"],
      where: {
        id: user.id
      }
    });
    if (user.login != oldUser.login) {
      user.login = oldUser.login;
    }
    if (user.email != oldUser.email) {
      user.email = oldUser.email;
    }
    /*
    if (user.document != null) {
      user.document[0];
      if (userDocument) {

        userDocument.user = result;
        userDocument.path = '/' + result.login;
        let date = new Date(Date.now()).toISOString().substring(0, 19);
        userDocument.fileName = result.login + '-' + date.replace(/:/g, '-') + userDocument.name.slice(userDocument.name.toString().indexOf('.'));
        await this._userDocumentService.create(userDocument, currentUser);

      }
      
    }*/
    let result = await this._userRepository.save(user);
    this._changeLog(newUser, oldUser, currentUser, remoteIP);

    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      result.password = null;
      result.resetKey = null;
      userView = result;
    } else {
      userView = plainToClass(UserDTO, result);
    }

    return userView;
  }

  /**
   * Method to archive user
   *
   * @param {User} user
   * @param {*} currentUser
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async archive(loginValue: string, currentUser: any, remoteIP: string): Promise<User> {
    let user: User = await this._userRepository.findOne({
      where: {
        login: loginValue
      }
    });
    if (!user) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'user with login: (' + loginValue + ') not found', null, null, user.id, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (user.isArchived == true) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.FAILED, remoteIP, 'user with login: (' + loginValue + ') is alearady archived', null, null, user.id, null, currentUser);
      throw new HttpException('User is alerady archived', HttpStatus.BAD_REQUEST);
    }
    user.isArchived = true;
    user.archivedDate = new Date(Date.now());
    let result = await this._update(user, currentUser);
    this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.SUCCESS, remoteIP, "archive", null, null, user.id, null, currentUser);

    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      result.password = null;
      result.resetKey = null;
      userView = result;
    } else {
      userView = plainToClass(UserDTO, result);
    }
    return userView;
  }

  /* 
  -----------------------------------------------------------------------------------------------------
  @ Method for controller ACCOUNT
  -----------------------------------------------------------------------------------------------------
  */

  /**
   * Method to active or blok user
   *
   * @param {string} loginValue : login
   * @param {*} currentUser : current user
   * @param {string} remoteIP : remote ip
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async activate(loginValue: string, currentUser: any, remoteIP: string): Promise<User> {
    const user = await this._userRepository.findOne({
      where: {
        login: loginValue,
      }
    });

    if (!user) {
      this._logService.saveLog(LogType.USER, LogAction.ACTIVATE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') not found', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (user.isArchived) {
      this._logService.saveLog(LogType.USER, LogAction.ACTIVATE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') is archived', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (!user.isActivated) {
      this._logService.saveLog(LogType.USER, LogAction.ACTIVATE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginValue + ') is not active', null, null, null, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let oldValue = user.isActivated;
    user.isActivated = !user.isActivated;

    let result = await this._update(user, currentUser);
    this._logService.saveLog(LogType.USER, LogAction.ACTIVATE, this.entity, LogOperation.SUCCESS, remoteIP, oldValue ? 'BLOCK USER' : 'ACTIVATE USER', oldValue.toString(), user.isActivated.toString(), user.id, 'isActivated', currentUser);

    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      result.password = null;
      result.resetKey = null;
      userView = result;
    } else {
      userView = plainToClass(UserDTO, result);
    }
    return userView
  }


  /**
   * Method to change password
   *
   * @param {PasswordDTO} password
   * @param {User} currentUser
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async changePassword(password: PasswordDTO, currentUser: any, remoteIP: string): Promise<User> {
    const userLogin = password.login;
    const userOldPassword = password.currentPassword;
    const userNewPassword = password.newPassword;
    if (currentUser.login !== userLogin && !currentUser.authorities.includes(RoleType.SUPER_ADMIN)) {
      this._logService.saveLog(LogType.USER, LogAction.CHANGE_PASSWORD, this.entity, LogOperation.NOT_AUTHORIZED, remoteIP, "Change password for login (" + userLogin + ') not authorized', null, null, null, null, currentUser);
      throw new HttpException('You don\'nt have permession.', HttpStatus.BAD_REQUEST);
    }
    const user = await this._userRepository.findOne({
      where: {
        login: userLogin,
      }
    });
    if (!user) {
      this._logService.saveLog(LogType.USER, LogAction.CHANGE_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') not found', null, null, null, null, currentUser);
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else if (user.isArchived == true) {
      this._logService.saveLog(LogType.USER, LogAction.CHANGE_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') is archived', null, null, null, null, currentUser);
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    if (user.password !== userOldPassword) {
      this._logService.saveLog(LogType.USER, LogAction.CHANGE_PASSWORD, this.entity, LogOperation.FAILED, remoteIP, 'User : (' + userLogin + ') old password wrong', null, null, user.id, null, currentUser);
      throw new HttpException('Invalid password.', HttpStatus.BAD_REQUEST);
    }
    user.password = userNewPassword;
    let result = await this._update(user, currentUser);
    this._logService.saveLog(LogType.USER, LogAction.CHANGE_PASSWORD, this.entity, LogOperation.SUCCESS, remoteIP, 'Change password', null, null, user.id, 'password', currentUser);
    this._userLogService.save(user, userOldPassword, userNewPassword, false, remoteIP, currentUser);

    let userView;
    if (currentUser.authorities.includes(RoleType.SUPER_ADMIN) || currentUser.authorities.includes(RoleType.ADMIN)) {
      result.password = null;
      result.resetKey = null;
      userView = result;
    } else {
      userView = plainToClass(UserDTO, result);
    }

    return userView
  }

  /**
   * Method to request change password
   *
   * @param {PasswordResetDTO} password : Password reset dto
   * @param {*} currentUser : user
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async changeResetKey(password: PasswordResetDTO, remoteIP: string): Promise<HttpStatus> {
    const userLogin = password.login;
    const userEmail = password.email;

    const user = await this._userRepository.findOne({
      where: {
        login: userLogin,
        email: userEmail,
      }
    });

    if (!user) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') not found');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else if (user.isArchived == true) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') is archived');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else if (user.isActivated == false) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') is not active');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    let oldResetKey = user.resetKey;
    user.resetKey = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    user.resetDate = new Date(Date.now());

    let currentUser: User = new User();
    currentUser.login = "anonyms"
    await this._update(user, currentUser);
    this._mailService.sendResetPassword(user);
    this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.SUCCESS, remoteIP, null, oldResetKey, user.resetKey, user.id, 'resetKey');
    return HttpStatus.ACCEPTED;
  }

  /**
   * Method to reset password from reset key
   *
   * @param {PasswordResetDTO} password
   * @param {*} currentUser
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  public async resetPassword(password: PasswordResetDTO, remoteIP: string): Promise<HttpStatus> {
    const userLogin = password.login;
    const userEmail = password.email;
    const userResetKey = password.resetKey;
    const userNewPassword = password.newPassword;

    const user = await this._userRepository.findOne({
      where: {
        login: userLogin,
        email: userEmail,
      }
    });

    if (!user) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') not found');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else if (user.isArchived == true) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') is archived');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    } else if (user.isActivated == false) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.REQUEST_RESET_PASSWORD, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + userLogin + ') email : (' + userEmail + ') is not active');
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    if (user.resetKey == null) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.RESET_PASSWORD, this.entity, LogOperation.FAILED, remoteIP, 'User : (' + userLogin + ') : the request reset password not submitted.');
      throw new HttpException('Request reset password not submitted.', HttpStatus.BAD_REQUEST);
    }

    if (user.resetKey !== userResetKey) {
      this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.RESET_PASSWORD, this.entity, LogOperation.FAILED, remoteIP, 'User : (' + userLogin + ') Invalid reset key (' + userResetKey + ')');
      throw new HttpException('Invalid reset key.', HttpStatus.BAD_REQUEST);
    }

    let userOldPassword = user.password;
    user.password = userNewPassword;
    user.resetKey = null;
    user.resetDate = new Date(Date.now());
    let currentUser: User = new User();
    currentUser.login = "anonyms"
    await this._update(user, currentUser);
    this._logService.saveLog(LogType.CONFIDENTIAL, LogAction.RESET_PASSWORD, this.entity, LogOperation.SUCCESS, remoteIP, null, userResetKey, user.resetKey, user.id, 'resetKey');
    this._userLogService.save(user, userOldPassword, userNewPassword, true, remoteIP, currentUser, userResetKey);
    return HttpStatus.ACCEPTED
  }

  /* 
  -----------------------------------------------------------------------------------------------------
  @ Method for other Service
  -----------------------------------------------------------------------------------------------------
  */

  /**
   * Method to find user by field option
   *
   * @param {FindOneOptions<User>} options : option where user
   * @return {*}  {(Promise<User>)}
   * @memberof UserService
   */
  public async findByfields(options: FindOneOptions<User>): Promise<User> {
    options.relations = ['authorities'];
    const result = await this._userRepository.findOne(options);
    return result;
  }

  /**
   * Method to find user by field option
   *
   * @param {FindOneOptions<User>} options : option where user
   * @return {*}  {(Promise<User>)}
   * @memberof UserService
   */
  public async findDtoByfields(options: FindOneOptions<User>): Promise<UserDTO> {
    const result = await this._userRepository.findOne(options);
    let userDocumentDto = await this._userDocumentService.findByUserId(result.id);
    let userDTO: UserDTO = plainToClass(UserDTO, result);
    if (userDocumentDto) {
      userDTO.document = null;
      userDTO.document = userDocumentDto
    }
    return userDTO;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Method to update user with log
   *
   * @private
   * @param {User} user
   * @param {*} currentUser
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  private async _update(user: User, currentUser: any): Promise<User> {
    user = this._convertInAuthorities(user);
    user = this._logService.logOnUpdate(user, currentUser);
    let result = await this._userRepository.save(user);
    return result;
  }

  /**
   * Method to get the authority from user
   *
   * @private
   * @param {*} user : user
   * @return {*}  {User}
   * @memberof UserService
   */
  private _flatAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach(authority => authorities.push(authority.name));
      user.authorities = authorities;
    }
    return user;
  }


  private _convertInAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach(authority => authorities.push({ name: authority }));
      user.authorities = authorities;
    }
    return user;
  }

  /**
   * Method to log any change in update of user
   *
   * @private
   * @param {User} user
   * @param {User} olduser
   * @param {*} currentUser
   * @param {string} remoteIP
   * @memberof UserService
   */
  private _changeLog(user: User | User, olduser: User, currentUser: any, remoteIP: string) {
    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        const elementNew = user[key];
        const elementOld = olduser[key];
        if (elementNew !== elementOld && key !== 'createdBy' && key !== 'createdDate' && key !== 'lastModifiedBy' && key !== 'lastModifiedDate' && key !== 'password' && key !== 'resetKey' && key !== 'authorities') {
          this._logService.saveLog(LogType.USER, LogAction.UPDATE, this.entity, LogOperation.SUCCESS, remoteIP, 'Update', elementOld, elementNew, user.id, key, currentUser)
        }
      }
    }
  }

}
