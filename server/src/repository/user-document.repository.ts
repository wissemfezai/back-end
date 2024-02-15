import { EntityRepository, Repository } from 'typeorm';
import { UserDocument } from '../domain/postgresql/user-document.entity';

@EntityRepository(UserDocument)
export class UserDocumentRepository extends Repository<UserDocument> {
}
