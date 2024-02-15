import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Req, UseInterceptors, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { User } from '../../domain/postgresql/user.entity';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../service/dto/user-dto.dto';

@Controller('api/users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('user-resource')
export class UserController {
  logger = new Logger('UserController');

  constructor(private readonly _userService: UserService) { }

  @Get('')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: [UserDTO]
  })
  async getAll(@Req() req: Request): Promise<UserDTO[] | User[]> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const sortField = req.query.sort;
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, sortField);
    const [results, count] = await this._userService.findAndCount({
      where: {
        isArchived: false,

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
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: User
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Req() req: Request, @Body() userDto: User): Promise<User | UserDTO> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const created = await this._userService.create(userDto, req.user, remoteIP);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: User
  })
  async update(@Req() req: Request, @Body() user: User): Promise<User> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', user.id);
    return await this._userService.updateUser(user, req.user, remoteIP);
  }

  @Get('/:login')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User
  })
  async getOne(@Req() req: Request, @Param('login') loginValue: string): Promise<UserDTO | User> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    return await this._userService.findByLogin(loginValue, req.user, remoteIP);
  }

  @Delete('/:login')
  @ApiOperation({ summary: 'Archive user' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  async deleteUser(@Req() req: Request, @Param('login') loginValue: string): Promise<User> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    HeaderUtil.addEntityDeletedHeaders(req.res, 'User', loginValue);
    return await this._userService.archive(loginValue, req.user, remoteIP);
  }
}
