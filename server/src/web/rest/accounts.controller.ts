import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request, response } from 'express';
import Accounts from '../../domain/postgresql/accounts.entity';
import { AccountsService } from '../../service/accounts.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as txml from 'txml';
import { XmljsUtils } from '../../utils/xmljs.utils';
import { AccountsDto } from '../../service/dto/accounts-dto.dto';

@Controller('api/accounts')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('accounts')
export class AccountsController {
  logger = new Logger('AccountsController');

  constructor(private readonly accountsService: AccountsService , private xmlUtils : XmljsUtils) {}

  @Get('/la')
  async listAccounts():Promise<any> {
 return await this.accountsService.listAccounts() ;

  }

  @Get('/ai')
  async getAccountInfo():Promise<any> {
 return await this.accountsService.getAccountInfo() ;

  }

  @Get('/ar')
  async getAccountRates():Promise<any> {
 return await this.accountsService.getAccountRates() ;

  }

  @Get('/am')
  async getAccountMinutePlans():Promise<any> {
 return await this.accountsService.getAccountMinutePlans() ;

  }

  @Get('/ars')
  async getRegistrationStatus():Promise<any> {
 return await this.accountsService.getRegistrationStatus() ;

  }

  @Post('/:idCustomer')
  async addAccount(@Body() accounts : AccountsDto , @Param('idCustomer') idCustomer : string ):Promise<any> {
 console.log(accounts);
 console.log(idCustomer);
console.log("yesss");
 //return  accounts;
  return await this.accountsService.addAccount(accounts , idCustomer);

  }

  @Post('/')
  async create(@Req() req: Request, @Body() accounts: Accounts): Promise<Accounts> {
    const created = await this.accountsService.create(accounts);
   HeaderUtil.addEntityCreatedHeaders(req.res, 'Accounts', created.iAccount);
    return created;
  }



}
