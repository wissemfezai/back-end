import { Body, Controller, Logger, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDTO } from '../../service/dto/user-login.dto';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('user-jwt-controller')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly _authService: AuthService) { }

  @Post('/authenticate')
  @ApiOperation({ summary: 'Authorization api retrieving token' })
  @ApiResponse({
    status: 201,
    description: 'Authorized'
  })
  async authenticate(@Req() req: Request, @Body() user: UserLoginDTO, @Res() res: Response): Promise<any> {
    const remoteIP = req.connection.remoteAddress.split(':')[req.connection.remoteAddress.split(':').length - 1];
    const jwt = await this._authService.authenticate(user, remoteIP);
    res.setHeader('Authorization', 'Bearer ' + jwt.id_token);
    return res.json(jwt);
  }
}
