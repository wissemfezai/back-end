import { EntityRepository, Repository } from 'typeorm';
import Cdr from '../domain/postgresql/cdr.entity';

@EntityRepository(Cdr)
export class CdrRepository extends Repository<Cdr> {}
