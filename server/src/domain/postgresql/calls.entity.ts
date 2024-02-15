/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

/**
 * A Cdr.
 */
@Entity('calls')
export default class Calls {
  @PrimaryColumn({ type: 'integer', name: 'i_enviromment'})
  iEnviromment: number;

  @Column({ name: 'cli', nullable: true })
  cli: string;

  @Column({ name: 'cld', nullable: true })
  cld: string;

  @Column({type: 'integer', name: 'i_connection', nullable: true })
  iConnection: number;

  @Column({ name: 'direction', nullable: true })
  direction: string;

  @Column({ name: 'call_id', nullable: true })
  callId: string;

  @Column({ name: 'delay', nullable: true })
  delay: number;

  @Column({ type: 'integer', name: 'i_account', nullable: true })
  iAccount: number;

  @Column({ name: 'cc_state', nullable: true })
  ccState: string;

  @Column({ name: 'caller_media_ip', nullable: true })
  callerMediaIp: string;

  @Column({ type: 'integer', name: 'duration', nullable: true })
  duration: number;

  @Column({ type: 'integer', name: 'i_customer', nullable: true })
  iCustomer: number;

  @Column({ name: 'callee_media_ip', nullable: true })
  calleeMediaIp: string;

 
  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
