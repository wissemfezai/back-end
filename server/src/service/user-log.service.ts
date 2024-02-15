import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLog } from '../domain/postgresql/user-log.entity';
import { User } from '../domain/postgresql/user.entity';
import { UserLogRepository } from '../repository/user-log.repository';

@Injectable()
export class UserLogService {

  logger = new Logger('UserLogService');

  constructor(
    @InjectRepository(UserLogRepository) private _userLogRepository: UserLogRepository,
  ) { }

  /**
   * Method to save log user password
   *
   * @param {User} user
   * @param {string} oldPassword
   * @param {string} newPassword
   * @param {boolean} isReset
   * @param {string} remoteIp
   * @param {User} currentUser
   * @param {string} [resetKey]
   * @return {*}  {Promise<UserLog>}
   * @memberof UserLogService
   */
  public async save(
    user: User,
    oldPassword: string,
    newPassword: string,
    isReset: boolean,
    remoteIp: string,
    currentUser: User,
    resetKey?: string,
  ): Promise<UserLog> {

    let userLog = new UserLog();
    userLog.user = user;
    userLog.oldPassword = oldPassword;
    userLog.newPassword = newPassword;
    userLog.isReset = isReset;
    userLog.ip = remoteIp;
    userLog.resetKey = resetKey ? resetKey : null;
    userLog.createdBy = currentUser ? currentUser.login : 'anonymous';
    userLog.createdDate = new Date(Date.now());
    userLog.isArchived = false;

    return await this._userLogRepository.save(userLog);
  }
}
