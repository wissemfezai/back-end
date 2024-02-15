import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class CallDTO {

@IsNumber()
iEnviromment: number;

@IsString()
cli: string;

@IsString()
cld: string;

@IsNumber()
iConnection: number;

@IsString()
direction: string;

@IsString()
callId: string;

@IsNumber()
delay: number;

@IsNumber()
iAccount: number;

@IsString()
ccState: string;

@IsString()
callerMediaIp: string;

@IsNumber()
duration: number;

@IsNumber()
iCustomer: number;

@IsString()
calleeMediaIp: string;




}