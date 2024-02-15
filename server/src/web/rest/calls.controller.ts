import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request, response } from 'express';
import Calls from '../../domain/postgresql/calls.entity';
import { CallsService } from '../../service/calls.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as txml from 'txml';
import { XmljsUtils } from '../../utils/xmljs.utils';

@Controller('api/calls')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('calls')
export class CallsController {
  logger = new Logger('CallsController');

  constructor(private readonly callsService: CallsService , private xmlUtils : XmljsUtils) {}

  @Get('/cs')
  async getCallS():Promise<any> {
 return await this.getCallS() ;

  }

  @Get('/cb')
  async getCallbackStatus(): Promise<any> {
   return await this.getCallbackStatus() ;
  
    }



  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Calls
  })
  async getAll(@Req() req: Request): Promise<Calls[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.callsService.findAndCount({
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
    type: Calls
  })
  async getOne(@Param('id') id: string): Promise<Calls> {
    return await this.callsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create calls' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Calls
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() calls: Calls): Promise<Calls> {
    const created = await this.callsService.save(calls);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Calls', created.iEnviromment);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update calls' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Calls
  })
  async put(@Req() req: Request, @Body() calls: Calls): Promise<Calls> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Calls', calls.iEnviromment);
    return await this.callsService.update(calls);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete calls' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Calls> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Calls', id);
    const toDelete = await this.callsService.findById(id);
    return await this.callsService.delete(toDelete);
  }
}
