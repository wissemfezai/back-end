import { Authority } from './authority.entity';
import { Entity, Column, ManyToMany, JoinTable, ObjectIdColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, VersionColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { config } from '../../config';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { TypeUser } from './enumeration/type-user';
import { LangKey } from './enumeration/lang-key';
import { UserCivility } from './enumeration/user-civility';
import { MailSetting } from './mail-setting.entity';
import { UserDocument } from './user-document.entity';

@Entity('yooth_user')
export class User {

  @ObjectIdColumn()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
  id?: number;

  @ApiProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @Index("login-idx")
  login: string;

  @ApiProperty({ enum: ['SIR', 'MRS'], description: 'User civility' })
  @Column({ type: 'simple-enum', name: 'civility', enum: UserCivility, nullable: false })
  civility: UserCivility;

  @ApiProperty({ example: 'MyUser', description: 'User first name' })
  @Column({ type: 'varchar', length: 50, name: 'first_name', nullable: false })
  firstName: string;

  @ApiProperty({ example: 'MyUser', description: 'User last name' })
  @Column({ type: 'varchar', length: 50, name: 'last_name', nullable: false })
  lastName: string;

  @ApiProperty({ example: 'myuser@localhost', description: 'User email' })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @Index("email-idx")
  email: string;

  @ManyToOne(type => MailSetting, { cascade: true, nullable: true })
  @JoinColumn({
    name: "id_mail_setting",
    referencedColumnName: "id"
  })
  mailSetting?: MailSetting;

  @OneToMany(type => UserDocument, userDocument => userDocument.user)
  document?: UserDocument;

  @ApiProperty({ example: 'myuser', description: 'User password' })
  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: config.get('crypto.key-pwd'),
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: config.get('crypto.iv-pwd')
    })
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'User activation' })
  @Column({ name: 'is_activated', nullable: false })
  isActivated: boolean;

  @ApiProperty({ enum: ['FR', 'EN'], description: 'User language' })
  @Column({ type: 'simple-enum', name: 'lang_key', enum: LangKey, nullable: false })
  langKey: LangKey;

  @ApiProperty({ enum: ['EMPLOYEE', 'CUSTOMER'], description: 'User type' })
  @Column({ type: 'simple-enum', name: 'type_user', enum: TypeUser, nullable: false })
  typeUser: TypeUser;

  @ApiProperty({ example: '+335498985', description: 'User Phone' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @ApiProperty({ example: '2020-11-19', description: 'User birthday' })
  @Column({ type: 'date', nullable: true })
  birthday?: string;

  @ApiProperty({ example: '62s6a99', description: 'User activation key' })
  @Column({ name: 'activation_key', nullable: true })
  activationKey?: string;

  @ApiProperty({ example: 'jzkzo', description: 'User reset key' })
  @Column({
    type: 'varchar',
    transformer: new EncryptionTransformer({
      key: config.get('crypto.key-reset'),
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: config.get('crypto.iv-reset')
    }),
    name: 'reset_key',
    nullable: true
  })
  resetKey?: string;

  @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'User reset date' })
  @Column({ type: 'timestamp without time zone', name: 'reset_date', nullable: true })
  resetDate?: Date;

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

  // eslint-disable-next-line
  @ManyToMany(type => Authority)
  @JoinTable()
  @ApiProperty({ isArray: true, enum: ['ROLE_SUPER_ADMIN', 'ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'], description: 'Array of permissions' })
  authorities?: any[];
}
