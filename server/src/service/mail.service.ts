import { Injectable, Logger } from '@nestjs/common';
import { TypeTemplate } from '../domain/mongodb/enumeration/type-template';
import { MailSetting } from '../domain/postgresql/mail-setting.entity';
import { MailTemplate } from '../domain/mongodb/mail-template.entity';
import { User } from '../domain/postgresql/user.entity';
import { MailSettingService } from './mail-setting.service';
import { MailTemplateService } from './mail-template.service';

const nodemailer = require("nodemailer");

@Injectable()
export class MailService {
  logger = new Logger('MailService');
  constructor(
    private _mailTemplateService: MailTemplateService,
    private _mailSettingService: MailSettingService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Method to send mail for create user
   *
   * @param {User} user
   * @memberof MailService
   */
  public async sendCreateUser(user: User) {
    let mailTemplate: MailTemplate = await this._mailTemplateService.findOneDefault(TypeTemplate.CREATE_USER);
    let mailSetting: MailSetting = await this._mailSettingService.findOneDefault();
    let subject = await this._replaceVariable(mailTemplate.subject, user);
    let message = await this._replaceVariable(mailTemplate.message, user);

    let transporter: any = nodemailer.createTransport({
      host: mailSetting.smtpHost,
      port: mailSetting.smtpPort,
      secure: false,
      auth: {
        user: mailSetting.email,
        pass: mailSetting.password,
      },
    })

    await transporter.sendMail({
      to: user.email,
      from: mailSetting.name + ' <' + mailSetting.email + '>',
      subject: subject,
      html: message
    }).then((a) => { console.log(a) })
      .catch(e => console.log(e));

  }


  /**
   * Method to send mail to reset password
   *
   * @param {User} user
   * @memberof MailService
   */
  public async sendResetPassword(user: User) {
    let mailTemplate: MailTemplate = await this._mailTemplateService.findOneDefault(TypeTemplate.RESET_PASSWORD);
    let mailSetting: MailSetting = await this._mailSettingService.findOneDefault();
    let subject = await this._replaceVariable(mailTemplate.subject, user);
    let message = await this._replaceVariable(mailTemplate.message, user);

    let transporter: any = nodemailer.createTransport({
      host: mailSetting.smtpHost,
      port: mailSetting.smtpPort,
      secure: false,
      auth: {
        user: mailSetting.email,
        pass: mailSetting.password,
      },
    })

    await transporter.sendMail({
      to: user.email,
      from: mailSetting.name + ' <' + mailSetting.email + '>',
      subject: subject,
      html: message
    }).then((a) => console.log(a))
      .catch(e => console.log(e));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------


  private async _replaceVariable(text: string, user: User) {
    text = text.replace(/{{user.civility}}/g, user.civility);
    text = text.replace(/{{user.firstName}}/g, user.firstName);
    text = text.replace(/{{user.lastName}}/g, user.lastName);
    text = text.replace(/{{user.email}}/g, user.email);
    text = text.replace(/{{user.password}}/g, user.password);
    text = text.replace(/{{user.login}}/g, user.login);
    text = text.replace(/{{user.isActivated}}/g, user.isActivated ? "activé" : "non activé");
    text = text.replace(/{{user.langKey}}/g, user.langKey);
    text = text.replace(/{{user.typeUser}}/g, user.typeUser);
    text = text.replace(/{{user.phone}}/g, user.phone ? user.phone : '');
    text = text.replace(/{{user.birthday}}/g, user.birthday ? user.birthday : '');
    text = text.replace(/{{user.activationKey}}/g, user.activationKey ? user.activationKey : '');
    text = text.replace(/{{user.resetKey}}/g, user.resetKey ? user.resetKey : '');
    text = text.replace(/{{user.resetDate}}/g, user.resetDate ? user.resetDate.toString() : '');
    text = text.replace(/{{user.createdBy}}/g, user.createdBy);
    text = text.replace(/{{user.createdDate}}/g, user.createdDate.toString());
    text = text.replace(/{{user.lastModifiedBy}}/g, user.lastModifiedBy);
    text = text.replace(/{{user.lastModifiedDate}}/g, user.lastModifiedDate.toString());
    text = text.replace(/{{user.isArchived}}/g, user.isArchived.toString());
    text = text.replace(/{{user.archivedDate}}/g, user.archivedDate ? user.archivedDate.toString() : '');
    return text;
  }

}
