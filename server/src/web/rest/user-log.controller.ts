import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard, RolesGuard } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserLogService } from '../../service/user-log.service';

@Controller('api/users-log')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('user-resource')
export class UserLogController {
  logger = new Logger('UserLogController');

  constructor(private readonly _userLogService: UserLogService) { }

}
