import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from '../web/rest/log.controller';
import { LogRepository } from '../repository/log.repository';
import { LogService } from '../service/log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogRepository], "mongo")
  ],

  controllers: [LogController],

  providers: [LogService],

  exports: [LogService]
})
export class LogModule { }
