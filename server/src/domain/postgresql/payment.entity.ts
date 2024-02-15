/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
//import { BaseEntity } from './base/base.entity';

/**
 * A Payment
 */
@Entity('payment')
export default class Payment {


  @PrimaryColumn({ type: 'integer', name: 'i_customer '})
  iCustomer: number;
  
  @PrimaryColumn({ type: 'integer', name: 'i_account'})
  iAccount : number;

  @PrimaryColumn({ type: 'integer', name: 'i_payment'})
  iPayment: number;

  @Column({ name: 'payment_time', nullable: true })
  payment_time: string;

  @Column({ name: 'payer_ip_address', nullable: true })
  payerIpAddress: string;

  @Column({ name: 'amount', nullable: true })
  amount: string;

  @Column({ name: 'currency', nullable: true })
  currency: string;

  @Column({ name: 'tx_id', nullable: true })
  txId: string;

  @Column({ name: 'tx_error', nullable: true })
  txError: string;

  @Column({ name: 'tx_result', nullable: true })
  txResult: string;

  @Column({ name: 'by_credit_debit_card', nullable: true })
  byCreditDebitCard: string;

  @Column({ name: 'by_voucher', nullable: true })
  byVoucher: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;
 
  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}