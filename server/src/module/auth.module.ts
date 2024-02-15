import { HttpModule, HttpService, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { config } from '../config';
import { AuthorityRepository } from '../repository/authority.repository';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';
import { LogModule } from './log.module';
import { AppGateway } from '../web/soket/app.gateway';


@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorityRepository]),
    UserModule,
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: config['jhipster.security.authentication.jwt.base64-secret'],
      signOptions: { expiresIn: '300s' }
    }),
    LogModule,
  ],

  controllers: [
    UserJWTController,
    AuthController,
    AccountController
  ],

  providers: [
    AuthService,
    JwtStrategy,
    AppGateway,
  ],

  exports: [AuthService]
})
export class AuthModule { }
