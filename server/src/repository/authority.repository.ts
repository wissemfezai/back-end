import { EntityRepository, Repository } from 'typeorm';
import { Authority } from '../domain/postgresql/authority.entity';

@EntityRepository(Authority)
export class AuthorityRepository extends Repository<Authority> { }
