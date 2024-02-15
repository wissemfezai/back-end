import { EntityRepository, Repository } from 'typeorm';
import Payment from '../domain/postgresql/payment.entity';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}