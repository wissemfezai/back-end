import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEmpty, IsNumber, IsOptional, isString, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CustomerDto {

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    name: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    web_password: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_tariff: number;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    web_login: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    balance: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    credit_limit: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    accounts_matching_rule: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    company_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    salutation: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    first_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    last_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    mid_init: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    street_addr: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    state: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    postal_code: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    city: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    country: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    contact: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    fax: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    alt_phone: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    alt_contact: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    cc: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    bcc: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    mail_from: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    payment_currency: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    min_payment_amount: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    api_password: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    commission_size: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    description: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    overcommit_limit: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    i_lang: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    css: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    dns_alias: string;
    
    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    max_calls_per_second: string;
    
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_routing_group: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    accounts_mgmt: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    customers_mgmt: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    system_mgmt: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    payment_method: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    api_access: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    api_mgmt: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_commission_agent: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    tariffs_mgmt: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    max_depth: number;
        
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    use_own_tariff: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    vouchers_mgmt: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_password_policy: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_time_zone: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_export_type: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    start_page: number;
            
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    max_sessions: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    callshop_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    overcommit_protection: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    did_pool_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    ivr_apps_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    asr_acd_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    debit_credit_cards_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    conferencing_enabled: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    share_payment_processors: number;
                
    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    dncl_enabled: number;

}