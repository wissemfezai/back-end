import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEmpty, IsNumber, IsOptional, isString, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class AccountsDto {

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    username: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    web_password: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    authname: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    voip_password: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_tariff: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_time_zone: number;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    i_lang: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    balance: string;

    @ApiProperty({ example: '', description: ' ' })
    @IsString()
    credit_limit: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    blocked: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    max_sessions: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    max_credit_time: number;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    translation_rule: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    cli_translation_rule: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    cpe_number: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_export_type: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    reg_allowed: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    trust_cli: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    disallow_loops: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    vm_enabled: number;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    vm_password: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    vm_notify_emails: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    vm_forward_emails: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    vm_del_after_fwd: number;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    company_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    salutation: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    first_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    mid_init: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    last_name: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    street_addr: string;

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
    contact: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    phone: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    fax: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    alt_phone: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    alt_contact: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    email: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    cc: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    bcc: string;

    @ApiProperty({ example: '', description: '' })
    @IsString()
    payment_currency: string;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    payment_method: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    on_payment_action: number;

    @ApiProperty({ type: 'big int', description: '' })
    @IsNumber()
    min_payment_amount: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    lifetime: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    preferred_codec: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    use_preferred_codec_only: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    welcome_call_ivr: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_billing_plan: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_media_relay_type: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_password_policy: number;

    @ApiProperty({ type: '', description: '' })
    @IsNumber()
    i_routing_group: number;



    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_account_class: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    vm_timeout: number;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    vm_check_number: string;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_commission_agent: number;

    @ApiProperty({ type: 'big int', description: '' })
    @IsOptional()
    @IsNumber()
    commission_size: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    lan_access: number;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    batchTag: string;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_provisioning: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    invoicing_enabled: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_invoice_template: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    i_caller_name_type: number;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    caller_name: string;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    followme_enabled: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    vm_dialin_access: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    hide_own_cli: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    block_incoming_anonymous: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    dnd_enabled: number;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: '', description: '' })
    @IsOptional()
    @IsString()
    p_assrt_id_translation_rule: string;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    pass_p_asserted_id: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    dncl_lookup: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    generate_ringbacktone: number;

    @ApiProperty({ type: 'big int', description: '' })
    @IsOptional()
    @IsNumber()
    max_calls_per_second: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    allow_free_onnet_calls: number;

    @ApiProperty({ type: '', description: '' })
    @IsOptional()
    @IsNumber()
    start_page: number;

    @ApiProperty({ type: '', description: '', required: false })
    @IsNumber()
    @IsOptional()
    trust_privacy_hdrs: number;
}