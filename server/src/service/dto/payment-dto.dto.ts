import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEmpty, IsNumber, IsOptional, isString, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class PaymentDto {

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_account: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_customer: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_card_type: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    exp_mm: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    exp_yy: number;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    amount: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    alias: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    currency: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    payer_ip_address: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    number: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    holder: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    street_addr1: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    @IsOptional()
    street_addr2: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    state: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    postal_code: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    city: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    country: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    phone: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    @IsOptional()
    cvv: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    @IsOptional()
    i_debit_credit_card: number;



}