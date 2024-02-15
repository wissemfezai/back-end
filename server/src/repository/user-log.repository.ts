import { EntityRepository, Repository } from 'typeorm';
import { UserLog } from '../domain/postgresql/user-log.entity';

@EntityRepository(UserLog)
export class UserLogRepository extends Repository<UserLog> {

}
