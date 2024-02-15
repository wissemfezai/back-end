import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Log } from '../domain/mongodb/log.entity';

@Injectable()
@EntityRepository(Log)
export class LogRepository extends Repository<Log> {

}
