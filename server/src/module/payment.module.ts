import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from '../web/rest/payment.controller';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentService } from '../service/payment.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentRepository]) , HttpModule ],
  controllers: [PaymentController],
  providers: [PaymentService , XmljsUtils],
  exports: [PaymentService , XmljsUtils]
})
export class PaymentModule {}