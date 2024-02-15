
import { Log } from '../../domain/mongodb/log.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { LogAction } from '../../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../../domain/mongodb/enumeration/log-operation';
import { LogType } from '../../domain/mongodb/enumeration/log-type';

export class SeedLogsRoles1570200490072 implements MigrationInterface {

  DateNow: Date = new Date(Date.now());

  log: Log = {
    action: LogAction.CREATE,
    operation: LogOperation.SUCCESS,
    type: LogType.CRON,
    entity: "1",
    description: "Test",
    isArchived: true

  };

  public async up(queryRunner: QueryRunner): Promise<any> {
    const conn = queryRunner.connection;

    const LogRepository = getRepository('yooth_log', 'mongo');

    await LogRepository.save([this.log])

  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> { }
}
