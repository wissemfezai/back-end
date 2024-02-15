/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

/**
 * A Cdr.
 */
@Entity('cdr')
export default class Cdr {
  @PrimaryColumn({ type: 'integer', name: 'i_account'})
  iAccount: number;

  @Column({ type: 'integer', name: 'yooth_offset', nullable: true })
  offset: number;

  @Column({ type: 'integer', name: 'yooth_limit', nullable: true })
  limit: number;

  @Column({ name: 'start_date', nullable: true })
  startDate: string;

  @Column({ name: 'end_date', nullable: true })
  endDate: string;

  @Column({ name: 'cli', nullable: true })
  cli: string;

  @Column({ name: 'cld', nullable: true })
  cld: string;

  @Column({ type: 'integer', name: 'i_cdr', nullable: true })
  iCdr: number;

  @Column({ name: 'setup_time', nullable: true })
  setupTime: string;

  @Column({ name: 'connect_time', nullable: true })
  connectTime: string;

  @Column({ type: 'integer', name: 'billed_duration', nullable: true })
  billedDuration: number;

  @Column({ type: 'integer', name: 'plan_duration', nullable: true })
  planDuration: number;

  @Column({ name: 'cli_in', nullable: true })
  cliIn: string;

  @Column({ name: 'cld_in', nullable: true })
  cldIn: string;

  @Column({ name: 'cost', nullable: true })
  cost: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'remote_ip', nullable: true })
  remoteIp: string;

  @Column({ type: 'integer', name: 'result', nullable: true })
  result: number;

  @Column({ name: 'protocol', nullable: true })
  protocol: string;

  @Column({ type: 'bigint', name: 'accessibility_cost', nullable: true })
  accessibilityCost: number;

  @Column({ type: 'integer', name: 'grace_period', nullable: true })
  gracePeriod: number;

  @Column({ type: 'bigint', name: 'post_call_surcharge', nullable: true })
  postCallSurcharge: number;

  @Column({ type: 'bigint', name: 'connect_fee', nullable: true })
  connectFee: number;

  @Column({ type: 'integer', name: 'free_seconds', nullable: true })
  freeSeconds: number;

  @Column({ type: 'bigint', name: 'duration', nullable: true })
  duration: number;

  @Column({ type: 'integer', name: 'interval_1', nullable: true })
  interval1: number;

  @Column({ type: 'integer', name: 'interval_n', nullable: true })
  intervalN: number;

  @Column({ type: 'bigint', name: 'price_1', nullable: true })
  price1: number;

  @Column({ type: 'bigint', name: 'price_n', nullable: true })
  priceN: number;

  @Column({ type: 'bigint', name: 'delay', nullable: true })
  delay: number;

  @Column({ type: 'bigint', name: 'pdd_1_xx', nullable: true })
  pdd1xx: number;

  @Column({ type: 'integer', name: 'i_call', nullable: true })
  iCall: number;

  @Column({ name: 'call_id', nullable: true })
  callId: string;

  @Column({ name: 'prefix', nullable: true })
  prefix: string;

  @Column({ name: 'lrn_cld', nullable: true })
  lrnCld: string;

  @Column({ name: 'lrn_cld_in', nullable: true })
  lrnCldIn: string;

  @Column({ name: 'p_asserted_id', nullable: true })
  pAssertedId: string;

  @Column({ name: 'remote_party_id', nullable: true })
  remotePartyId: string;

  @Column({ name: 'release_source', nullable: true })
  releaseSource: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @Column({ name: 'area_name', nullable: true })
  areaName: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
