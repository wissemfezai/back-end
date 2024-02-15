import { EntityRepository, Repository } from 'typeorm';
import Vendor from '../domain/postgresql/vendor.entity';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {}
