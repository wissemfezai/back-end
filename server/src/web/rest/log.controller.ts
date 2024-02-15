import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LogService } from '../../service/log.service';
import { Log } from '../../domain/mongodb/log.entity';


@Controller('api/logs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('logs-resource')
export class LogController {
  logger = new Logger('LogController');

  constructor(private readonly _logService: LogService) { }

  @Get('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Log
  })
  async getAllUsers(@Req() req: Request): Promise<Log[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this._logService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

}
