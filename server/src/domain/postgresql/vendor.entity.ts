/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Vendor.
 */
@Entity('vendor')
export default class Vendor {
  @PrimaryColumn({ type: 'integer', name: 'i_vendor' })
  iVendor: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'destination', nullable: true })
  destination: string;

  @Column({ type: 'integer', name: 'i_media_relay', nullable: true })
  iMediaRelay: number;

  @Column({ name: 'username', nullable: true })
  username: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'translation_rule', nullable: true })
  translationRule: string;

  @Column({ name: 'cli_translation_rule', nullable: true })
  cliTranslationRule: string;

  @Column({ type: 'integer', name: 'i_media_relay_type', nullable: true })
  iMediaRelayType: number;

  @Column({ type: 'integer', name: 'capacity', nullable: true })
  capacity: number;

  @Column({ type: 'boolean', name: 'enforce_capacity', nullable: true })
  enforceCapacity: boolean;

  @Column({ name: 'huntstop_scodes', nullable: true })
  huntstopScodes: string;

  @Column({ type: 'boolean', name: 'blocked', nullable: true })
  blocked: boolean;

  @Column({ type: 'integer', name: 'timeout_100', nullable: true })
  timeout100: number;

  @Column({ type: 'integer', name: 'i_protocol', nullable: true })
  iProtocol: number;

  @Column({ type: 'integer', name: 'i_proto_transport', nullable: true })
  iProtoTransport: number;

  @Column({ type: 'boolean', name: 'qmon_acd_enabled', nullable: true })
  qmonAcdEnabled: boolean;

  @Column({ type: 'boolean', name: 'qmon_asr_enabled', nullable: true })
  qmonAsrEnabled: boolean;

  @Column({ type: 'integer', name: 'qmon_stat_window', nullable: true })
  qmonStatWindow: number;

  @Column({ type: 'integer', name: 'qmon_acd_threshold', nullable: true })
  qmonAcdThreshold: number;

  @Column({ type: 'bigint', name: 'qmon_asr_threshold', nullable: true })
  qmonAsrThreshold: number;

  @Column({ type: 'integer', name: 'qmon_retry_interval', nullable: true })
  qmonRetryInterval: number;

  @Column({ type: 'integer', name: 'qmon_retry_batch', nullable: true })
  qmonRetryBatch: number;

  @Column({ name: 'qmon_action', nullable: true })
  qmonAction: string;

  @Column({ type: 'boolean', name: 'qmon_notification_enabled', nullable: true })
  qmonNotificationEnabled: boolean;

  @Column({ type: 'boolean', name: 'use_asserted_id', nullable: true })
  useAssertedId: boolean;

  @Column({ name: 'asserted_id_translation', nullable: true })
  assertedIdTranslation: string;

  @Column({ name: 'outbound_ip', nullable: true })
  outboundIp: string;

  @Column({ type: 'bigint', name: 'max_cps', nullable: true })
  maxCps: number;

  @Column({ type: 'boolean', name: 'ignore_lrn', nullable: true })
  ignoreLrn: boolean;

  @Column({ type: 'boolean', name: 'single_outbound_port', nullable: true })
  singleOutboundPort: boolean;

  @Column({ name: 'outbound_proxy', nullable: true })
  outboundProxy: string;

  @Column({ type: 'boolean', name: 'accept_redirects', nullable: true })
  acceptRedirects: boolean;

  @Column({ type: 'integer', name: 'redirect_depth_limit', nullable: true })
  redirectDepthLimit: number;

  @Column({ name: 'from_domain', nullable: true })
  fromDomain: string;

  @Column({ type: 'boolean', name: 'enable_diversion', nullable: true })
  enableDiversion: boolean;

  @Column({ name: 'diversion_translation', nullable: true })
  diversionTranslation: string;

  @Column({ type: 'integer', name: 'i_privacy_mode', nullable: true })
  iPrivacyMode: number;

  @Column({ type: 'boolean', name: 'random_call_id', nullable: true })
  randomCallId: boolean;

  @Column({ name: 'pass_ruri_params', nullable: true })
  passRuriParams: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
