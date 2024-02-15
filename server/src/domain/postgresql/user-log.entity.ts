import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, VersionColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { config } from '../../config';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { User } from './user.entity';

@Entity('yooth_user_log')
export class UserLog {

  @ObjectIdColumn()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
  id?: number;

  @ManyToOne(type => User, { cascade: true })
  @JoinColumn({
    name: "id_user",
    referencedColumnName: "id"
  })
  user: User;

  @ApiProperty({ example: 'myuser', description: 'User log old password' })
  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: config.get('crypto.key-old-pwd'),
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: config.get('crypto.iv-old-pwd')
    }),
    name: 'old_password',
    nullable: false
  })
  oldPassword: string;

  @ApiProperty({ example: '0000', description: 'User log new password' })
  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: config.get('crypto.key-new-pwd'),
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: config.get('crypto.iv-new-pwd')
    }),
    name: 'new_password',
    nullable: false
  })
  newPassword: string;

  @ApiProperty({ example: false, description: 'User log reset password' })
  @Column({ name: 'is_reset', nullable: false })
  isReset: Boolean;

  @ApiProperty({ example: 'jzkzo', description: 'User log reset key' })
  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: config.get('crypto.key-old-reset'),
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: config.get('crypto.iv-old-reset')
    }),
    name: 'reset_key',
    nullable: true
  })
  resetKey?: string;

  @ApiProperty({ example: '41.222.62.35', description: 'User log ip' })
  @Column({ type: 'varchar', length: 50, name: 'ip', nullable: false })
  ip?: string;

  @ApiProperty({ example: 'admin', description: 'Created by' })
  @Column({ type: 'varchar', length: 50, name: 'created_by', nullable: false })
  createdBy?: string;

  @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Created date' })
  @Column({ type: 'timestamp without time zone', name: 'created_date', nullable: false })
  createdDate?: Date;

  @ApiProperty({ example: false, description: 'Archived' })
  @Column({ name: 'is_archived', nullable: false })
  isArchived?: Boolean;

  @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Archived date' })
  @Column({ type: 'timestamp without time zone', name: 'archived_date', nullable: true })
  archivedDate?: Date;

  @ApiProperty({ example: 2, description: 'User version' })
  @VersionColumn()
  version?: number;

}
