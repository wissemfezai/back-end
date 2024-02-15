import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class MailSettingDTO {


    @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
    @IsNumber()
    id?: number;

    @ApiProperty({ example: 'myuser@localhost', description: 'Setting email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'myuser', description: 'Setting email password' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    pop3Host?: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    pop3Port?: number;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    imapHost?: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    imapPort?: number;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    smtpHost: string;

    @ApiProperty({ example: 'user', description: 'Settig name' })
    @IsString()
    smtpPort: number;

    @ApiProperty({ example: false, description: 'Default' })
    @IsBoolean()
    isDefault: Boolean;

    @ApiProperty({ example: 'admin', description: 'Created by' })
    @IsString()
    createdBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Created date' })
    createdDate?: Date;

    @ApiProperty({ example: 'admin', description: 'Last modified by' })
    @IsString()
    lastModifiedBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Last modified date' })
    lastModifiedDate?: Date;

    @ApiProperty({ example: false, description: 'Archived' })
    @IsBoolean()
    isArchived?: Boolean;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Archived date' })
    archivedDate?: Date;


}
