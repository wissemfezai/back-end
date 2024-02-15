import { Body, Param, Post, UseGuards, Controller, Get, Logger, Req, UseInterceptors, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { User } from '../../domain/postgresql/user.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

import { PasswordDTO } from '../../service/dto/password-dto.dto';
import { PasswordResetDTO } from '../../service/dto/password-reset-dto.dto';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('account-resource')
export class AccountController {
  logger = new Logger('AccountController');

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) { }


  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('/authenticate')
  @ApiOperation({ summary: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated'
  })
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user.login;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('/activate/:login')
  @ApiOperation({ summary: 'Activate an account' })
  @ApiResponse({
    status: 200,
    description: 'activated'
  })
  @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
  async activate(@Req() req: Request, @Param('login') loginValue: string): Promise<User> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    return await this._userService.activate(loginValue, req.user, remoteIP)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('/account')
  @ApiOperation({ summary: 'Get the current user.' })
  @ApiResponse({
    status: 200,
    description: 'user retrieved'
  })
  async getAccount(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    return await this._authService.findUserDtoWithAuthById(user.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('/account/change-password')
  @ApiOperation({ summary: 'Change current password' })
  @ApiResponse({
    status: 201,
    description: 'user password changed',
    type: User
  })
  async changePassword(@Req() req: Request, @Body() passwordDto: PasswordDTO): Promise<User> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    return await this._userService.changePassword(passwordDto, req.user, remoteIP);
  }

  @Post('/reset-password/init')
  @ApiOperation({ summary: 'Send an email to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'mail to reset password sent',
    type: 'string'
  })
  async requestPasswordReset(@Req() req: Request, @Body() passwordResetDTO: PasswordResetDTO): Promise<any> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    return await this._userService.changeResetKey(passwordResetDTO, remoteIP)
  }

  @Post('/reset-password/finish')
  @ApiOperation({ summary: 'Finish to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'password reset',
    type: 'string'
  })
  async resetPassword(@Req() req: Request, @Body() passwordResetDTO: PasswordResetDTO): Promise<HttpStatus> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    return await this._userService.resetPassword(passwordResetDTO, remoteIP)
  }
}
