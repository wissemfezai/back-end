import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { config } from '../../config';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('yooth_mail_setting')
export class MailSetting {

    @ObjectIdColumn()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
    id?: number;

    @ApiProperty({ example: 'myuser@localhost', description: 'Setting email' })
    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @ApiProperty({ example: 'myuser', description: 'Setting email password' })
    @Column({
        type: 'varchar',
        transformer: new EncryptionTransformer({
            key: config.get('crypto.key-email'),
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: config.get('crypto.iv-email')
        }),
        name: 'password',
        nullable: false
    })
    password: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'varchar', length: 100, name: 'pop_host', nullable: true })
    pop3Host?: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'integer', name: 'pop_port', nullable: true })
    pop3Port?: number;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'varchar', length: 100, name: 'imap_host', nullable: true })
    imapHost?: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'integer', name: 'imap_port', nullable: true })
    imapPort?: number;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'varchar', length: 100, name: 'smtp_host', nullable: false })
    smtpHost: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @Column({ type: 'integer', name: 'smtp_port', nullable: false })
    smtpPort: number;

    @ApiProperty({ example: false, description: 'Default' })
    @Column({ name: 'is_default', nullable: false })
    isDefault: Boolean;

    @ApiProperty({ example: 'admin', description: 'Created by' })
    @Column({ type: 'varchar', length: 50, name: 'created_by', nullable: false })
    createdBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Created date' })
    @Column({ type: 'timestamp without time zone', name: 'created_date', nullable: false })
    createdDate?: Date;

    @ApiProperty({ example: 'admin', description: 'Last modified by' })
    @Column({ type: 'varchar', length: 50, name: 'last_modified by', nullable: false })
    lastModifiedBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Last modified date' })
    @Column({ type: 'timestamp without time zone', name: 'last_modified_date', nullable: false })
    lastModifiedDate?: Date;

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
