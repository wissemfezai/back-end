/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

/**
 * A Account.
 */
@Entity('accounts')
export default class Accounts {
  @PrimaryColumn({ type: 'integer', name: 'i_account'})
  iAccount: number;

  @Column({ name: 'username', nullable: true })
  username: string;

  @Column({ name: 'web_password', nullable: true })
  webPassword: string;

  @Column({type: 'integer', name: 'max_sessions', nullable: true })
  maxSessions: number;

  @Column({ name: 'authname', nullable: true })
  authname: string;

  @Column({ name: 'voip_password', nullable: true })
  voipPassword: string;

  @Column({ name: 'translation_rule', nullable: true })
  translationRule: number;

  @Column({ type: 'integer', name: 'max_credit_time', nullable: true })
  maxCreditTime: number;

  @Column({ name: 'cli_translation_rule', nullable: true })
  cliTranslationRule: string;

  @Column({ name: 'credit_limit', nullable: true })
  creditLimit: string;

  @Column({ type: 'integer', name: 'i_routing_group', nullable: true })
  iRoutingGroup: number;

  @Column({ type: 'integer', name: 'i_billing_plan', nullable: true })
  iBillingPlan: number;

  @Column({ type: 'integer', name: 'i_account_class', nullable: true })
  iAccountClass: number;

  @Column({ type: 'integer', name: 'i_time_zone', nullable: true })
  iTimeZone: number;

  @Column({ name: 'balance', nullable: true })
  balance: string;

  @Column({ name: 'cpe_number', nullable: true })
  cpeNumber: string;

  @Column({ type: 'integer', name: 'vm_enabled', nullable: true })
  vmEnabled: number;

  @Column({ name: 'vm_password', nullable: true })
  vmPassword: string;

  @Column({ type: 'integer', name: 'vm_timeout', nullable: true })
  vmTimeout: number;

  @Column({ name: 'vm_check_number', nullable: true })
  vmCheckNumber: string;

  @Column({ type: 'integer', name: 'blocked', nullable: true })
  blocked: number;

  @Column({ name: 'i_lang', nullable: true })
  iLang: string;

  @Column({ name: 'payment_currency', nullable: true })
  paymentCurrency: string;

  @Column({ type: 'integer', name: 'payment_method', nullable: true })
  paymentMethod: number;

  @Column({ type: 'integer', name: 'i_export_type', nullable: true })
  iExportType: number;

  @Column({ type: 'integer', name: 'lifetime', nullable: true })
  lifetime: number;

  @Column({ type: 'integer', name: 'i_commission_agent', nullable: true })
  iCommissionAgent: number;

  @Column({ name: 'commission_size', nullable: true })
  commissionSize: string;

  @Column({ type: 'integer', name: 'preferred_codec', nullable: true })
  preferredCodec: number;

  @Column({ type: 'integer', name: 'use_preferred_codec_only', nullable: true })
  usePreferredCodecOnly: number;

  @Column({ type: 'integer', name: 'reg_allowed', nullable: true })
  regAllowed: number;

  @Column({ type: 'integer', name: 'welcome_call_ivr', nullable: true })
  welcomeCallIvr: number;

  @Column({ type: 'integer', name: 'on_payment_action', nullable: true })
  onPaymentAction: number;

  @Column({ name: 'min_payment_amount', nullable: true })
  minPaymentAmount: string;

  @Column({ type: 'integer', name: 'trust_cli', nullable: true })
  trustCli: number;

  @Column({ type: 'integer', name: 'disallow_loops', nullable: true })
  disallowLoops: number;

  @Column({ name: 'vm_notify_emails', nullable: true })
  vmNotifyEmails: string;

  @Column({ name: 'vm_forward_emails', nullable: true })
  vmForwardEmails: string;

  @Column({ type: 'integer', name: 'vm_del_after_fwd', nullable: true })
  vmDelAfterFwd: number;

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  @Column({ name: 'salutation', nullable: true })
  salutation: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'mid_init', nullable: true })
  midInit: string;

  @Column({ name: 'street_addr', nullable: true })
  streetAddr: string;

  @Column({ name: 'state', nullable: true })
  state: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ name: 'contact', nullable: true })
  contact: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'fax', nullable: true })
  fax: string;

  @Column({ name: 'alt_phone', nullable: true })
  altPhone: string;

  @Column({ name: 'alt_contact', nullable: true })
  altContact: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'cc', nullable: true })
  cc: string;

  @Column({ name: 'bcc', nullable: true })
  bcc: string;

  @Column({ type: 'integer', name: 'i_password_policy', nullable: true })
  iPasswordPolicy: number;

  @Column({ type: 'integer', name: 'vpn_enabled', nullable: true })
  vpnEnabled: number;

  @Column({ name: 'vpn_password', nullable: true })
  vpnPassword: string;

  @Column({ name: 'i_media_relay_type', nullable: true })
  iMediaRelayType: string;

  @Column({ type: 'integer', name: 'lan_access', nullable: true })
  lanAccess: number;

  @Column({ name: 'batch_tag', nullable: true })
  batchTag: string;

  @Column({ type: 'integer', name: 'i_provisioning', nullable: true })
  iProvisioning: number;

  @Column({ type: 'integer', name: 'invoicing_enabled', nullable: true })
  invoicingEnabled: number;

  @Column({ type: 'integer', name: 'i_invoice_template', nullable: true })
  iInvoiceTemplate: number;

  @Column({ type: 'integer', name: 'i_caller_name_type', nullable: true })
  iCallerNameType: number;

  @Column({ name: 'caller_name', nullable: true })
  callerName: string;

  @Column({ type: 'integer', name: 'followme_enabled', nullable: true })
  followmeEnabled: number;

  @Column({ type: 'integer', name: 'vm_dialin_access', nullable: true })
  vmDialinAccess: number;

  @Column({ type: 'integer', name: 'hide_own_cli', nullable: true })
  hideOwnCli: number;

  @Column({ type: 'integer', name: 'block_incoming_anonymous', nullable: true })
  blockIncomingAnonymous: number;

  @Column({ type: 'integer', name: 'i_incoming_anonymous_action', nullable: true })
  iIncomingAnonymousAction: number;

  @Column({ type: 'integer', name: 'dnd_enabled', nullable: true })
  dndEnabled: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'integer', name: 'pass_p_asserted_id', nullable: true })
  passPAssertedId: number;

  @Column({ name: 'p_assrt_id_translation_rule', nullable: true })
  pAssrtIdTranslationRule: string;

  @Column({ type: 'integer', name: 'dncl_lookup', nullable: true })
  dnclLookup: number;

  @Column({ type: 'integer', name: 'generate_ringbacktone', nullable: true })
  generateRingbacktone: number;

  @Column({ name: 'max_calls_per_second', nullable: true })
  maxCallsPerSecond: string;

  @Column({ type: 'integer', name: 'allow_free_onnet_calls', nullable: true })
  allowFreeOnnetCalls: number;

  @Column({ type: 'integer', name: 'start_page', nullable: true })
  startPage: number;

 
  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
