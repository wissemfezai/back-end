import { EntityRepository, Repository } from 'typeorm';
import { MailSetting } from '../domain/postgresql/mail-setting.entity';

@EntityRepository(MailSetting)
export class MailSettingRepository extends Repository<MailSetting> {

}
