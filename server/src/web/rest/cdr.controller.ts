import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Cdr from '../../domain/postgresql/cdr.entity';
import { CdrService } from '../../service/cdr.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as txml from 'txml';
import { XmljsUtils } from '../../utils/xmljs.utils';

@Controller('api/cdrs')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('cdrs')
export class CdrController {
  logger = new Logger('CdrController');

  constructor(private readonly cdrService: CdrService , private xmlUtils : XmljsUtils) {}

  @Get('/cc')
  async getCustomerCDRs():Promise<any>  {

return await this.getCustomerCDRs();
  }

  @Get('/ca')
  async getAccountCDRs(): Promise<any>  {
  return await this.getCustomerCDRs();

  }

  @Get('/ccd')
  async getCDRSDP(): Promise<any>  {

    return await this.getCDRSDP() ;

  }

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Cdr
  })
  async getAll(@Req() req: Request): Promise<Cdr[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.cdrService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cdr
  })
  async getOne(@Param('id') id: string): Promise<Cdr> {
    return await this.cdrService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create cdr' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cdr
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cdr: Cdr): Promise<Cdr> {
    const created = await this.cdrService.save(cdr);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cdr', created.iCdr);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update cdr' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Cdr
  })
  async put(@Req() req: Request, @Body() cdr: Cdr): Promise<Cdr> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cdr', cdr.iCdr);
    return await this.cdrService.update(cdr);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete cdr' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Cdr> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Cdr', id);
    const toDelete = await this.cdrService.findById(id);
    return await this.cdrService.delete(toDelete);
  }
}
