import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { Request } from 'express';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailTemplateService } from '../../service/mail-template.service';
import { MailTemplate } from '../../domain/mongodb/mail-template.entity';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { HeaderUtil } from '../../client/header-util';

@Controller('api/mail-template')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('mail-template-resource')
export class MailTemplateController {
  logger = new Logger('MailTemplateController');

  constructor(private readonly _mailTemplateService: MailTemplateService) { }


  @Get('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all Template mail not archived' })
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: [MailTemplate]
  })
  async getAllNotArchived(@Req() req: Request): Promise<MailTemplate[]> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this._mailTemplateService.findAndCount({
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
  @ApiOperation({ summary: 'Create mail Template' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MailTemplate
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Req() req: Request, @Body() mailTemplate: MailTemplate): Promise<MailTemplate> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const created = await this._mailTemplateService.create(mailTemplate, req.user, remoteIP);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'mail Template', created._id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Update mail Template' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MailTemplate
  })
  async update(@Req() req: Request, @Body() mailTemplate: MailTemplate): Promise<MailTemplate> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MailTemplate', mailTemplate._id);
    return await this._mailTemplateService.update(mailTemplate, req.user, remoteIP);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Archive mail Template' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  async deleteUser(@Req() req: Request, @Param('id') id: number): Promise<MailTemplate> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MailTemplate', id);
    return await this._mailTemplateService.archive(id, req.user, remoteIP);
  }
}
