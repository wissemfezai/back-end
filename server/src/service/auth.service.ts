import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../service/dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { User } from '../domain/postgresql/user.entity';
import { UserService } from '../service/user.service';
import { LogService } from './log.service';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';
import { UserDTO } from './dto/user-dto.dto';
import { AppGateway } from '../web/soket/app.gateway';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  entity = 'USER';

  constructor(
    private readonly _jwtService: JwtService,
    private _userService: UserService,
    private _logService: LogService,
    private _gateway: AppGateway
  ) { }

  /**
   * Method to authenticate user
   *
   * @param {UserLoginDTO} userLogin
   * @param {string} remoteIP
   * @return {*}  {Promise<any>}
   * @memberof AuthService
   */
  public async authenticate(userLogin: UserLoginDTO, remoteIP: string): Promise<any> {

    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;
    let userFind: User;
    if (loginUserName.includes("@")) {
      userFind = await this._userService.findByfields({
        where: {
          email: loginUserName
        }
      });
    } else {
      userFind = await this._userService.findByfields({
        where: {
          login: loginUserName
        }
      });
    }


    if (!userFind) {
      this._logService.saveLog(LogType.USER, LogAction.AUTHENTICATE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginUserName + ') not found or wrong password');
      throw new HttpException('Invalid login name or password.', HttpStatus.BAD_REQUEST);
    } else if (userFind.password !== loginPassword) {
      this._logService.saveLog(LogType.USER, LogAction.AUTHENTICATE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'User : (' + loginUserName + ') wrong password (' + loginPassword + ')');
      throw new HttpException('Invalid login name or password.', HttpStatus.BAD_REQUEST);
    } else if (userFind.isArchived) {
      this._logService.saveLog(LogType.USER, LogAction.AUTHENTICATE, this.entity, LogOperation.FAILED, remoteIP, 'User : (' + loginUserName + ') is archived');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (!userFind.isActivated) {
      this._logService.saveLog(LogType.USER, LogAction.AUTHENTICATE, this.entity, LogOperation.FAILED, remoteIP, 'User : (' + loginUserName + ') is not active');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.findUserWithAuthById(userFind.id);

    const payload: Payload = {
      id: user.id,
      username: user.login,
      authorities: user.authorities
    };

    this._logService.saveLog(LogType.USER, LogAction.AUTHENTICATE, this.entity, LogOperation.SUCCESS, remoteIP, 'User : (' + loginUserName + ') authenticate', null, null, userFind.id, null, userFind);
    this._gateway.server.emit('newAuth', user)
    /* eslint-disable  */
    return {
      id_token: this._jwtService.sign(payload)
    };
  }

  public async validateUser(payload: Payload): Promise<User> {
    return await this.findUserWithAuthById(payload.id);
  }

  public async findUserWithAuthById(userId: number): Promise<User> {
    return await this._userService.findByfields({ where: { id: userId } })
  }

  public async findUserDtoWithAuthById(userId: number): Promise<UserDTO> {
    return await this._userService.findDtoByfields({
      relations: ['authorities', 'document'],
      where: {
        id: userId,

      }
    })
  }
}
