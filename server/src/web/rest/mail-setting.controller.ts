import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { Request } from 'express';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailSettingService } from '../../service/mail-setting.service';
import { MailSetting } from '../../domain/postgresql/mail-setting.entity';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { HeaderUtil } from '../../client/header-util';

@Controller('api/mail-setting')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('mail-setting-resource')
export class MailSettingController {

  logger = new Logger('MailSettingController');

  constructor(
    private readonly _mailSettingService: MailSettingService) { }


  @Get('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all setting mail not archived' })
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: [MailSetting]
  })
  async getAllNotArchived(@Req() req: Request): Promise<MailSetting[]> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this._mailSettingService.findAndCount({
      where: {
        isArchived: false
      },
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    }, req.user, remoteIP);
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Post('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Create mail setting' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MailSetting
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Req() req: Request, @Body() mailSetting: MailSetting): Promise<MailSetting> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const created = await this._mailSettingService.create(mailSetting, req.user, remoteIP);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'mail setting', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Update mail setting' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MailSetting
  })
  async update(@Req() req: Request, @Body() mailSetting: MailSetting): Promise<MailSetting> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MailSetting', mailSetting.id);
    return await this._mailSettingService.update(mailSetting, req.user, remoteIP);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Archive mail setting' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  async deleteUser(@Req() req: Request, @Param('id') id: number): Promise<MailSetting> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MailSetting', id);
    return await this._mailSettingService.archive(id, req.user, remoteIP);
  }
}
