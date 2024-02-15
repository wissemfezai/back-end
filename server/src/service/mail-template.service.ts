import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeTemplate } from '../domain/mongodb/enumeration/type-template';
import { MailTemplate } from '../domain/mongodb/mail-template.entity';
import { FindManyOptions } from 'typeorm';
import { MailTemplateRepository } from '../repository/mail-template.repository';
import { LogService } from './log.service';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';

@Injectable()
export class MailTemplateService {

  logger = new Logger('MailTemplateService');
  entity = 'MAIL.TEMPLATE';

  constructor(
    @InjectRepository(MailTemplateRepository, "mongo") private _mailTemplateRepository: MailTemplateRepository,
    private _logService: LogService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Method to find mail template with option
   *
   * @param {FindManyOptions<MailTemplate>} options
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {Promise<[MailTemplate[], number]>}
   * @memberof MailTemplateService
   */
  public async findAndCount(options: FindManyOptions<MailTemplate>, currentUser: any, remoteIP: string): Promise<[MailTemplate[], number]> {
    const resultList = await this._mailTemplateRepository.findAndCount(options);
    this._logService.saveLog(LogType.USER, LogAction.VIEW, this.entity, LogOperation.SUCCESS, remoteIP, 'VIEW ALL', null, null, null, null, currentUser);
    return resultList;
  }

  /**
   * Method to find the default mail template
   *
   * @param {TypeTemplate} type
   * @return {*}  {Promise<MailTemplate>}
   * @memberof MailTemplateService
   */
  public async findOneDefault(type: TypeTemplate): Promise<MailTemplate> {
    return await this._mailTemplateRepository.findOne({
      where: {
        type: type,
        isDefault: true,
        isArchived: false
      }
    })
  }

  /**
   * Method to create a new template mail
   *
   * @param {MailTemplate} mailTemplate
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailTemplate>}
   * @memberof MailTemplateService
   */
  public async create(mailTemplate: MailTemplate, currentUser: any, remoteIp: string): Promise<MailTemplate> {
    mailTemplate = await this._logService.logOnCreate(mailTemplate, currentUser);
    let nbr = await this._countOneDefault(mailTemplate.type);

    if (nbr == 0) {
      mailTemplate.isDefault = true;
    } else {
      mailTemplate.isDefault = false;
    }

    let result = await this._mailTemplateRepository.save(mailTemplate);
    this._logService.saveLog(LogType.USER, LogAction.CREATE, this.entity, LogOperation.SUCCESS, remoteIp, null, null, null, result._id, null, currentUser);
    return result;
  }

  /**
   * Method to update an exist template mail
   *
   * @param {MailTemplate} mailTemplate
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailTemplate>}
   * @memberof MailTemplateService
   */
  public async update(mailTemplate: MailTemplate, currentUser: any, remoteIp: string): Promise<MailTemplate> {
    let oldMailTemplate = await this._mailTemplateRepository.findOne({
      where: {
        id: mailTemplate._id
      }
    })
    mailTemplate = await this._logService.logOnUpdate(mailTemplate, currentUser);
    let result = this._mailTemplateRepository.save(mailTemplate);
    this._changeLog(mailTemplate, oldMailTemplate, currentUser, remoteIp);
    return result;
  }

  /**
   * Method to archive mail template
   *
   * @param {number} id : id mail template
   * @param {*} currentUser
   * @param {string} remoteIp
   * @return {*}  {Promise<MailTemplate>}
   * @memberof MailTemplateService
   */
  public async archive(id: number, currentUser: any, remoteIp: string): Promise<MailTemplate> {
    let mailTemplate: MailTemplate = await this._mailTemplateRepository.findOne({
      where: {
        id: id
      }
    })

    if (!mailTemplate) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.NOT_FOUND, remoteIp, null, null, null, null, null, currentUser);
      throw new HttpException('The template mail is not found', HttpStatus.NOT_FOUND);
    } else if (mailTemplate.isArchived) {
      this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.FAILED, remoteIp, null, null, null, mailTemplate._id, null, currentUser);
      throw new HttpException('The template mail is not found', HttpStatus.NOT_FOUND);
    }

    mailTemplate.isArchived = true;
    mailTemplate.archivedDate = new Date(Date.now());

    let result = await this._mailTemplateRepository.save(mailTemplate);
    this._logService.saveLog(LogType.USER, LogAction.ARCHIVE, this.entity, LogOperation.SUCCESS, remoteIp, null, null, null, result._id, null, currentUser);
    return result;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * ethod to count the default mail template
   *
   * @private
   * @param {TypeTemplate} type
   * @return {*}  {Promise<number>}
   * @memberof MailTemplateService
   */
  private async _countOneDefault(type: TypeTemplate): Promise<number> {
    return await this._mailTemplateRepository.count({
      where: {
        type: type,
        isDefault: true,
        isArchived: false
      }
    })
  }

  /**
   * Method to log any change in update of mail template
   *
   * @private
   * @param {MailTemplate} mailTemplate
   * @param {MailTemplate} oldMailTemplate
   * @param {*} currentUser
   * @param {string} remoteIP
   * @memberof MailTemplateService
   */
  private _changeLog(mailTemplate: MailTemplate, oldMailTemplate: MailTemplate, currentUser: any, remoteIP: string) {
    for (const key in mailTemplate) {
      if (Object.prototype.hasOwnProperty.call(mailTemplate, key)) {
        const elementNew = mailTemplate[key];
        const elementOld = oldMailTemplate[key];
        if (elementNew !== elementOld && key != 'createdBy' && key !== 'createdDate' && key !== 'lastModifiedBy' && key !== 'lastModifiedDate') {
          this._logService.saveLog(LogType.USER, LogAction.UPDATE, this.entity, LogOperation.SUCCESS, remoteIP, null, elementOld, elementNew, mailTemplate._id, key, currentUser)
        }
      }
    }
  }
}
