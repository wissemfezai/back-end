/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Customer.
 */
@Entity('customer')
export default class Customer {
  @PrimaryColumn({ type: 'integer', name: 'i_customer' })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'web_password', nullable: true })
  webPassword: string;

  @Column({ type: 'integer', name: 'i_tariff', nullable: true })
  iTariff: number;

  @Column({ name: 'web_login', nullable: true })
  webLogin: string;

  @Column({ type: 'integer', name: 'i_routing_group', nullable: true })
  iRoutingGroup: number;

  @Column({ type: 'bigint', name: 'balance', nullable: true })
  balance: number;

  @Column({ type: 'bigint', name: 'credit_limit', nullable: true })
  creditLimit: number;

  @Column({ name: 'accounts_mgmt', nullable: true })
  accountsMgmt: string;

  @Column({ name: 'customers_mgmt', nullable: true })
  customersMgmt: string;

  @Column({ type: 'integer', name: 'system_mgmt', nullable: true })
  systemMgmt: number;

  @Column({ name: 'accounts_matching_rule', nullable: true })
  accountsMatchingRule: string;

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

  @Column({ name: 'mail_from', nullable: true })
  mailFrom: string;

  @Column({ name: 'payment_currency', nullable: true })
  paymentCurrency: string;

  @Column({ type: 'integer', name: 'payment_method', nullable: true })
  paymentMethod: number;

  @Column({ type: 'bigint', name: 'min_payment_amount', nullable: true })
  minPaymentAmount: number;

  @Column({ type: 'integer', name: 'i_commission_agent', nullable: true })
  iCommissionAgent: number;

  @Column({ type: 'bigint', name: 'commission_size', nullable: true })
  commissionSize: number;

  @Column({ name: 'tariffs_mgmt', nullable: true })
  tariffsMgmt: string;

  @Column({ type: 'integer', name: 'max_depth', nullable: true })
  maxDepth: number;

  @Column({ type: 'integer', name: 'use_own_tariff', nullable: true })
  useOwnTariff: number;

  @Column({ name: 'vouchers_mgmt', nullable: true })
  vouchersMgmt: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'integer', name: 'i_password_policy', nullable: true })
  iPasswordPolicy: number;

  @Column({ type: 'boolean', name: 'callshop_enabled', nullable: true })
  callshopEnabled: boolean;

  @Column({ type: 'boolean', name: 'overcommit_protection', nullable: true })
  overcommitProtection: boolean;

  @Column({ type: 'bigint', name: 'overcommit_limit', nullable: true })
  overcommitLimit: number;

  @Column({ type: 'boolean', name: 'did_pool_enabled', nullable: true })
  didPoolEnabled: boolean;

  @Column({ type: 'boolean', name: 'ivr_apps_enabled', nullable: true })
  ivrAppsEnabled: boolean;

  @Column({ type: 'boolean', name: 'asr_acd_enabled', nullable: true })
  asrAcdEnabled: boolean;

  @Column({ type: 'boolean', name: 'debit_credit_cards_enabled', nullable: true })
  debitCreditCardsEnabled: boolean;

  @Column({ type: 'boolean', name: 'conferencing_enabled', nullable: true })
  conferencingEnabled: boolean;

  @Column({ type: 'boolean', name: 'share_payment_processors', nullable: true })
  sharePaymentProcessors: boolean;

  @Column({ type: 'boolean', name: 'dncl_enabled', nullable: true })
  dnclEnabled: boolean;

  @Column({ type: 'integer', name: 'i_time_zone', nullable: true })
  iTimeZone: number;

  @Column({ name: 'i_lang', nullable: true })
  iLang: string;

  @Column({ type: 'integer', name: 'i_export_type', nullable: true })
  iExportType: number;

  @Column({ type: 'integer', name: 'start_page', nullable: true })
  startPage: number;

  @Column({ name: 'dns_alias', nullable: true })
  dnsAlias: string;

  @Column({ type: 'integer', name: 'max_sessions', nullable: true })
  maxSessions: number;

  @Column({ type: 'bigint', name: 'max_calls_per_second', nullable: true })
  maxCallsPerSecond: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
