import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from '../web/rest/customer.controller';
import { CustomerRepository } from '../repository/customer.repository';
import { CustomerService } from '../service/customer.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository]) , HttpModule],
  controllers: [CustomerController],
  providers: [CustomerService , XmljsUtils],
  exports: [CustomerService , XmljsUtils]
})
export class CustomerModule {}
