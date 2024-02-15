import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { UserDocumentType } from '../../domain/postgresql/enumeration/user-document-type';
import { User } from '../../domain/postgresql/user.entity';

export class UserDocumentDTO {

    constructor(partial: Partial<UserDocumentDTO>) {
        Object.assign(this, partial);
    }

    @ApiProperty({ type: 'bigint', example: 1, description: 'Entity id' })
    @IsNumber()
    @Exclude()
    id?: number;

    @ApiProperty({ type: 'bigint', example: 1, description: 'User' })
    user: User;

    @ApiProperty({ enum: ['PICTURE', 'OTHER'], description: 'Document type' })
    @Exclude()
    type: UserDocumentType;

    @ApiProperty({ example: 'photo', description: 'Document name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'picture.png', description: 'Document file name' })
    @IsString()
    @Exclude()
    fileName: string;

    @ApiProperty({ example: '/user/image', description: 'Document path' })
    @IsString()
    @Exclude()
    path?: string;

    @ApiProperty({ example: 'user', description: 'Document bucket name' })
    @IsString()
    @Exclude()
    bucketName?: string;

    @ApiProperty({ example: 'dzadaf', description: 'Document data 64' })
    @IsString()
    data: string;

    @ApiProperty({ example: 'image/png', description: 'Document extention' })
    @IsString()
    extention: string;

    @ApiProperty({ example: 'http://cloud.io', description: 'Document externalPath' })
    @IsString()
    @Exclude()
    externalPath?: string;

    @ApiProperty({ example: 'admin', description: 'Created by' })
    @IsString()
    @Exclude()
    createdBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Created date' })
    @Exclude()
    createdDate?: Date;

    @ApiProperty({ example: 'admin', description: 'Last modified by' })
    @IsString()
    @Exclude()
    lastModifiedBy?: string;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Last modified date' })
    @Exclude()
    lastModifiedDate?: Date;

    @ApiProperty({ example: false, description: 'Archived' })
    @IsBoolean()
    @Exclude()
    isArchived?: Boolean;

    @ApiProperty({ example: '2020-11-19 09:17:05.59', description: 'Archived date' })
    @Exclude()
    archivedDate?: Date;

    @ApiProperty({ example: 2, description: 'User version' })
    @IsNumber()
    @Exclude()
    version?: number;


}
