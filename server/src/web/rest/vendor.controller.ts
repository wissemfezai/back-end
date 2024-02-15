import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Vendor from '../../domain/postgresql/vendor.entity';
import { VendorService } from '../../service/vendor.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import * as txml from 'txml';

@Controller('api/vendors')
//@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('vendors')
export class VendorController {
  logger = new Logger('VendorController');

  constructor(private readonly vendorService: VendorService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Vendor
  })
  async getAll(@Req() req: Request): Promise<Vendor[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vendorService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/cs')
   getVend(): Promise<any> {
  const self = this ;
   const aux =  this.vendorService.getVend().then(function(result){
    const parsedXml: any = txml.parse(result.toString(), { simplify: true, keepComments: false, });
    const methodCallArray = parsedXml.methodCall;
  
    const methodResponseArray = parsedXml.methodResponse;
   const methodCallJson = self.vendorService.methodCallParser(methodCallArray);
    const methodResponseJson = self.vendorService.ResponseMethodParser(methodResponseArray);
    let x = methodResponseJson.customers[0].i_customer
    return { methodCallJson, methodResponseJson , x}; 

      
  });
  
  return  aux ;

  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Vendor
  })
  async getOne(@Param('id') id: string): Promise<Vendor> {
    return await this.vendorService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create vendor' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Vendor
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vendor: Vendor): Promise<Vendor> {
    const created = await this.vendorService.save(vendor);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Vendor', created.iVendor);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update vendor' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Vendor
  })
  async put(@Req() req: Request, @Body() vendor: Vendor): Promise<Vendor> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Vendor', vendor.iVendor);
    return await this.vendorService.update(vendor);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete vendor' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Vendor> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Vendor', id);
    const toDelete = await this.vendorService.findById(id);
    return await this.vendorService.delete(toDelete);
  }
}
