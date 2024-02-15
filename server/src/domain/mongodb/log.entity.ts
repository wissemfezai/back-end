import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LogAction } from './enumeration/log-action';
import { LogOperation } from './enumeration/log-operation';
import { LogType } from './enumeration/log-type';

@Entity('yooth_log')
export class Log {

  @ApiProperty({ description: 'Log id' })
  @ObjectIdColumn()
  _id?: string

  @ApiProperty({ enum: ['USER', 'CRON'], description: 'Log type' })
  @Column({ type: 'simple-enum', name: 'type', enum: LogType, nullable: false })
  type: LogType;

  @ApiProperty({ enum: ['CREATE', 'UPDATE'], description: 'Log action' })
  @Column({ type: 'simple-enum', name: 'action', enum: LogAction, nullable: false })
  action: LogAction;

  @ApiProperty({ example: 'USER', description: 'Log entity' })
  @Column({ type: 'varchar', length: 50, name: 'entity', nullable: false })
  entity: string;

  @ApiProperty({ example: '2', description: 'Log entity id' })
  @Column({ type: 'bigint', name: 'id_entity', nullable: true })
  idEntity?: number;

  @ApiProperty({ example: 'nom', description: 'Log entity field' })
  @Column({ type: 'varchar', length: 50, name: 'field', nullable: true })
  field?: string;

  @ApiProperty({ enum: ['SUCCESS', 'FAILED'], description: 'Log operation' })
  @Column({ type: 'simple-enum', name: 'operation', enum: LogOperation, nullable: false })
  operation: LogOperation;

  @ApiProperty({ example: 'USER NOT FOUND', description: 'Log description' })
  @Column({ type: 'text', name: 'description', nullable: true })
  description?: string;

  @ApiProperty({ example: '192', description: 'Log old value' })
  @Column({ name: 'old_value', nullable: true })
  oldValue?: string;

  @ApiProperty({ example: '125', description: 'Log new value' })
  @Column({ name: 'new_value', nullable: true })
  newValue?: string;

  @ApiProperty({ example: '41.222.62.35', description: 'Log ip' })
  @Column({ type: 'varchar', length: 50, name: 'ip', nullable: false })
  ip?: string;

  @ApiProperty({ example: 'admin', description: 'Created by' })
  @Column({ type: 'varchar', length: 50, name: 'created_by', nullable: false })
  createdBy?: string;

  @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Created date' })
  @Column({ type: 'timestamp without time zone', name: 'created_date', nullable: false })
  createdDate?: Date;

  @ApiProperty({ example: true, description: 'Archived' })
  @Column({ name: 'is_archived', nullable: false })
  isArchived?: Boolean;

  @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Archived date' })
  @Column({ type: 'timestamp without time zone', name: 'archived_date', nullable: true })
  archivedDate?: Date;


}
