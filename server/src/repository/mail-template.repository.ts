import { EntityRepository, Repository } from 'typeorm';
import { MailTemplate } from '../domain/mongodb/mail-template.entity';

@EntityRepository(MailTemplate)
export class MailTemplateRepository extends Repository<MailTemplate> {

}
