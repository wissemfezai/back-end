import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailSetting } from '../domain/postgresql/mail-setting.entity';
import { FindManyOptions } from 'typeorm';
import { MailSettingRepository } from '../repository/mail-setting.repository';
import { LogService } from './log.service';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';

@Injectable()
export class MailSettingService {

  logger = new Logger('MailSettingService');
  entity = 'MAIL.SETTING';

  constructor(
    @InjectRepository(MailSettingRepository) private _mailSettingRepository: MailSettingRepository,
    private _logService: LogService
  ) { }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Method to find mail setting with option
   *
   * @param {FindManyOptions<MailSetting>} options
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {Promise<[MailSetting[], number]>}
   * @memberof MailSettingService
   */
  public async findAndCount(options: FindManyOptions<MailSetting>, currentUser: any, remoteIP: string): Promise<[MailSetting[], number]> {
    const resultList = await this._mailSettingRepository.findAndCount(options);
    this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'VIEW ALL', null, null, null, null, currentUser);
    return resultList;
  }

  /**
   * Method to find the default mail setting
   *
   * @return {*}  {Promise<MailSetting>}
   * @memberof MailSettingService
   */
  public async findOneDefault(): Promise<MailSetting> {
    return await this._mailSettingRepository.findOne({
      where: {
        isDefault: true,
        isArchived: false
      }
    })
  }

  /**
   * Method to create a new mail setting
   *
   * @param {MailSetting} mailSetting
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailSetting>}
   * @memberof MailSettingService
   */
  public async create(mailSetting: MailSetting, currentUser: any, remoteIp: string): Promise<MailSetting> {
    mailSetting = await this._logService.logOnCreate(mailSetting, currentUser);
    let result = await this._mailSettingRepository.save(mailSetting)
    this._logService.saveLog(LogType.USER, LogAction.CREATE, this.entity, LogOperation.SUCCESS, remoteIp, null, null, null, result.id, null, currentUser);
    return result;
  }

  /**
   * Method to update an exist mail setting
   *
   * @param {MailSetting} mailSetting
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailSetting>}
   * @memberof MailSettingService
   */
  public async update(mailSetting: MailSetting, currentUser: any, remoteIp: string): Promise<MailSetting> {
    let oldMailSetting = await this._mailSettingRepository.findOne({
      where: {
        id: mailSetting.id
      }
    })
    mailSetting = await this._logService.logOnUpdate(mailSetting, currentUser);
    let result = await this._mailSettingRepository.save(mailSetting);
    this._changeLog(mailSetting, oldMailSetting, currentUser, remoteIp);
    return result;
  }

  /**
   * Method to archive mail setting
   *
   * @param {number} id : id mail setting
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailSetting>}
   * @memberof MailSettingService
   */
  public async archive(id: number, currentUser: any, remoteIp: string): Promise<MailSetting> {
    let mailSetting: MailSetting = await this._mailSettingRepository.findOne({
      where: {
        id: id
      }
    })

    if (!mailSetting) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.NOT_FOUND, remoteIp, null, null, null, null, null, currentUser);
      throw new HttpException('The template mail is not found', HttpStatus.NOT_FOUND);
    } else if (mailSetting.isArchived) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.FAILED, remoteIp, null, null, null, mailSetting.id, null, currentUser);
      throw new HttpException('The template mail is not found', HttpStatus.NOT_FOUND);
    }

    mailSetting.isArchived = true;
    mailSetting.archivedDate = new Date(Date.now());
    let result = await this._mailSettingRepository.save(mailSetting);
    this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.SUCCESS, remoteIp, null, null, null, result.id, null, currentUser);
    return result;
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Method to log any change in update of mail setting
   *
   * @private
   * @param {MailSetting} mailSetting
   * @param {MailSetting} oldMailSetting
   * @param {*} currentUser
   * @param {string} remoteIP
   * @memberof MailSettingService
   */
  private _changeLog(mailSetting: MailSetting, oldMailSetting: MailSetting, currentUser: any, remoteIP: string) {
    for (const key in mailSetting) {
      if (Object.prototype.hasOwnProperty.call(mailSetting, key)) {
        const elementNew = mailSetting[key];
        const elementOld = oldMailSetting[key];
        if (elementNew !== elementOld && key !== 'createdBy' && key !== 'createdDate' && key !== 'lastModifiedBy' && key !== 'lastModifiedDate') {
          this._logService.saveLog(LogType.USER, LogAction.UPDATE, this.entity, LogOperation.SUCCESS, remoteIP, null, elementOld, elementNew, mailSetting.id, key, currentUser)
        }
      }
    }
  }


}
