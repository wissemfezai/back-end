import { EntityRepository, Repository } from 'typeorm';
import Calls from '../domain/postgresql/calls.entity';

@EntityRepository(Calls)
export class CallsRepository extends Repository<Calls> {}