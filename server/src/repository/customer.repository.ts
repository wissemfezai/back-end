import { EntityRepository, Repository } from 'typeorm';
import Customer from '../domain/postgresql/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
