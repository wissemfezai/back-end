import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Authority } from '../../domain/postgresql/authority.entity';
import { LangKey } from '../../domain/postgresql/enumeration/lang-key';
import { TypeUser } from '../../domain/postgresql/enumeration/type-user';
import { UserCivility } from '../../domain/postgresql/enumeration/user-civility';
import { MailSettingDTO } from './mail-setting-dto.dto';
import { UserDocumentDTO } from './user-document-dto.dto';

export class UserDTO {

    constructor(partial: Partial<UserDTO>) {
        Object.assign(this, partial);
    }

    @ApiProperty({ description: 'User id', required: false })
    @IsNumber()
    id?: number;

    @ApiProperty({ description: 'User login', required: true })
    @IsString()
    login: string;

    @ApiProperty({ description: 'User civility', required: true })
    civility: UserCivility;

    @ApiProperty({ description: 'User first name', required: true })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'User last name', required: true })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'User last name', required: true })
    @IsString()
    email: string;

    @ApiProperty({ description: 'User mail setting', required: false })
    @Exclude() ///
    mailSetting?: MailSettingDTO;

    @ApiProperty({ description: 'User document dto', required: false })
    document?: UserDocumentDTO;

    @ApiProperty({ description: 'User password', required: false })
    @IsString()
    @Exclude()
    password?: string;

    @ApiProperty({ description: 'User activared', required: true })
    @IsBoolean()
    isActivated: Boolean;

    @ApiProperty({ description: 'User language', required: true })
    @IsString()
    langKey: LangKey;

    @ApiProperty({ description: 'User type', required: true })
    typeUser: TypeUser;

    @ApiProperty({ description: 'User phone', required: false })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'User birthday', required: false })
    birthday: string;

    @ApiProperty({ example: 'dzadz5', description: 'User activation Key', required: false })
    @IsString()
    @Exclude()
    activationKey?: string;

    @ApiProperty({ example: 'a5zfAfz4', description: 'User reset key', required: false })
    @IsString()
    @Exclude()
    resetKey?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'User reset date', required: false })
    @Exclude()
    resetDate?: Date;

    @ApiProperty({ example: 'admin', description: 'User created by', required: false })
    @IsString()
    @Exclude()
    createdBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'User created date', required: false })
    @Exclude()
    createdDate?: Date;

    @ApiProperty({ example: 'admin', description: 'User last modified by', required: false })
    @IsString()
    @Exclude()
    lastModifiedBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'User last modified date', required: false })
    @Exclude()
    lastModifiedDate?: Date;

    @ApiProperty({ example: false, description: 'User is archived', required: false })
    @IsBoolean()
    @Exclude()
    isArchived?: Boolean;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'User archived date', required: false })
    @Exclude()
    archivedDate?: Date;

    @ApiProperty({ example: 2, description: 'User version', required: false })
    @Exclude()
    @IsNumber()
    version?: number;

    @ApiProperty({ description: 'User authority', required: true })
    authorities?: Authority[];



}
