import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, VersionColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserDocumentType } from './enumeration/user-document-type';
import { User } from './user.entity';

@Entity('yooth_user_document')
export class UserDocument {

  @ObjectIdColumn()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
  id?: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: "id_user",
    referencedColumnName: "id"
  })
  user: User;

  @ApiProperty({ enum: ['PICTURE', 'OTHER'], description: 'Document type' })
  @Column({ type: 'simple-enum', name: 'type', enum: UserDocumentType, nullable: false })
  @Index("type-idx")
  type: UserDocumentType;

  @ApiProperty({ example: 'photo', description: 'Document name' })
  @Column({ type: 'varchar', name: 'name', length: 50, nullable: false })
  name: string;

  @ApiProperty({ example: 'picture.png', description: 'Document file name' })
  @Column({ type: 'varchar', name: 'file_name', length: 50, nullable: false })
  fileName: string;

  @ApiProperty({ example: '/user/image', description: 'Document path' })
  @Column({ type: 'varchar', name: 'path', length: 255, nullable: false })
  path?: string;

  @ApiProperty({ example: 'user', description: 'Document bucket name' })
  @Column({ type: 'varchar', name: 'bucket_name', length: 255, nullable: false })
  bucketName?: string;

  @ApiProperty({ example: 'base64', description: 'Document data' })
  @Column({ type: 'bytea', name: 'data', nullable: true })
  data?: Buffer;

  @ApiProperty({ example: 'image/png', description: 'Document extention' })
  @Column({ type: 'varchar', name: 'extention', length: 255, nullable: false })
  extention: string;

  @ApiProperty({ example: 'http://cloud.io', description: 'Document externalPath' })
  @Column({ type: 'varchar', name: 'external_path', length: 255, nullable: true })
  externalPath?: string;

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
