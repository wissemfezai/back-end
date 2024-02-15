import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request, response } from 'express';
import Payment from '../../domain/postgresql/payment.entity';
import { PaymentService } from '../../service/payment.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as txml from 'txml';
import { XmljsUtils } from '../../utils/xmljs.utils';
import { PaymentDto } from 'src/service/dto/payment-dto.dto';

@Controller('api/payment')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('payment')
export class PaymentController {
  logger = new Logger('PaymentController');

  constructor(private readonly paymentService: PaymentService , private xmlUtils : XmljsUtils) {}

  @Get('/getpaymentinfo')
  async getpaymentInfo( @Param('iWholesaler') iWholesaler : number ,@Param('iCustomer') iCustomer : number , @Param('iPayment') iPayment : number, @Param('iAccount') iAccount : number ):Promise<any> {
 return await this.paymentService.getpaymentInfo(iWholesaler , iCustomer , iPayment , iAccount) ;

  }

  @Get('/getpaymentslist')
  async getPaymentsList( @Param('iWholesaler') iWholesaler : number ,@Param('iCustomer') iCustomer : number , @Param('iAccount') iAccount : number ):Promise<any> {
 return await this.paymentService.getPaymentsList(iWholesaler , iCustomer , iAccount) ;

  }

  @Post('/accountaddfunds')
  async accountAddFunds( @Param('amount') amount : string ,@Param('currency') currency : string , @Param('iAccount') iAccount : number ):Promise<any> {
 return await this.paymentService.accountAddFunds(amount , currency , iAccount) ;

  }

  @Post('/makepayment')
  async makePayment( @Body('payment') Payment : PaymentDto , @Param('iWholesaler') iWholesaler : number ):Promise<any> {
 return await this.paymentService.makePayment(Payment , iWholesaler ) ;

  }

  @Post('/makepaymentbycard')
  async makePaymentByCard( @Body('payment') Payment : PaymentDto , @Param('iWholesaler') iWholesaler : number ):Promise<any> {
 return await this.paymentService.makePaymentByCard(Payment , iWholesaler ) ;

  }

  @Get('/getlowbalance')
  async getLowBalance( @Param('iCustomer') iCustomer : number ,@Param('iAccount') iAccount : number ):Promise<any> {
 return await this.paymentService.getLowBalance(iCustomer , iAccount ) ;

  }

  @Post('/adddebitcreditcard')
  async addDebitCreditCard( @Body('payment') Payment : PaymentDto ):Promise<any> {
 return await this.paymentService.addDebitCreditCard(Payment ) ;

  }

  @Delete('/')
  async deleteDebitCreditCard( @Param('iAccount') iAccount : number, @Param('iCustomer') iCustomer : number , @Param('iDebitCreditCard') iDebitCreditCard : number ):Promise<any> {
 return await this.paymentService.deleteDebitCreditCard(iAccount , iCustomer , iDebitCreditCard ) ;

  }

  @Get('/getdebitcreditcardinfo')
  async getDebitCreditCardInfo( @Param('iAccount') iAccount : number, @Param('iCustomer') iCustomer : number , @Param('iDebitCreditCard') iDebitCreditCard : number ):Promise<any> {
 return await this.paymentService.getDebitCreditCardInfo(iAccount , iCustomer , iDebitCreditCard ) ;

  }

  @Get('/listdebitcreditcards')
  async listDebitCreditCards( @Param('iAccount') iAccount : number, @Param('iCustomer') iCustomer : number , @Param('offset') offset : number ,  @Param('limit') limit : number):Promise<any> {
 return await this.paymentService.listDebitCreditCards(iAccount , iCustomer , offset , limit ) ;

  }







}
