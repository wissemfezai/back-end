import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/postgresql/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
}
