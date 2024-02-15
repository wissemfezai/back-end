import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, VersionColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TypeTemplate } from './enumeration/type-template';

@Entity('yooth_mail_template')
export class MailTemplate {

    @ObjectIdColumn()
    @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
    _id?: number;

    @ApiProperty({ example: 'user', description: 'Template name' })
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @ApiProperty({ enum: ['RESET_PASSWORD'], description: 'Template type' })
    @Index('type_template')
    @Column({ type: 'simple-enum', name: 'type', enum: TypeTemplate, nullable: false })
    type: TypeTemplate;

    @ApiProperty({ example: 'Reset password', description: 'Template subject' })
    @Column({ type: 'varchar', length: 250, nullable: false })
    subject: string;

    @ApiProperty({ example: '<html> <body></body> </html>', description: 'Template message' })
    @Column({ nullable: false })
    message: string;

    @ApiProperty({ example: false, description: 'Template default' })
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

    @ApiProperty({ example: 2, description: 'Template version' })
    @VersionColumn()
    version?: number;

}
