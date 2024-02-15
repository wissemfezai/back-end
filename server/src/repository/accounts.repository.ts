import { EntityRepository, Repository } from 'typeorm';
import Accounts from '../domain/postgresql/accounts.entity';

@EntityRepository(Accounts)
export class AccountsRepository extends Repository<Accounts> {}