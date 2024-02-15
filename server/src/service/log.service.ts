import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogRepository } from '../repository/log.repository';
import { FindManyOptions } from 'typeorm';
import { Log } from '../domain/mongodb/log.entity';
import { User } from '../domain/postgresql/user.entity';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';

@Injectable()
export class LogService {
  logger = new Logger('LogService');

  constructor(
    @InjectRepository(LogRepository, 'mongo') private readonly _logRepository: LogRepository,
  ) { }

  async findAndCount(options: FindManyOptions<Log>): Promise<[Log[], number]> {
    return await this._logRepository.findAndCount();
  }

  /**
   * Method to log on create data
   *
   * @param {*} data
   * @param {User} user
   * @return {*} 
   * @memberof LogService
   */
  public logOnCreate(data: any, user: User) {
    data.createdBy = user ? user.login : 'system';
    data.createdDate = new Date(Date.now());
    data.lastModifiedBy = user ? user.login : 'system';
    data.lastModifiedDate = new Date(Date.now());
    data.isArchived = false;
    return data;
  }

  /**
   * Method to log on update data
   *
   * @param {*} data
   * @param {User} user
   * @return {*} 
   * @memberof LogService
   */
  logOnUpdate(data: any, user: User) {
    data.lastModifiedBy = user ? user.login : 'system';
    data.lastModifiedDate = new Date(Date.now());
    return data;
  }

  public async saveLog(
    type: LogType,
    action: LogAction,
    entity: string,
    operation: LogOperation,
    remoteIp: string,
    description?: string,
    oldvalue?: string,
    newValue?: string,
    idEntity?: number,
    field?: string,
    user?: User
  ): Promise<Log> {

    let log = new Log();

    log.type = type;
    log.action = action;
    log.entity = entity;
    log.idEntity = idEntity;
    log.field = field;
    log.operation = operation;
    log.description = description;
    log.oldValue = oldvalue;
    log.newValue = newValue;
    log.ip = remoteIp;
    log.createdBy = user ? user.login : 'anonymous';
    log.createdDate = new Date(Date.now());
    log.isArchived = false;

    return await this._logRepository.save(log);
  }


}
