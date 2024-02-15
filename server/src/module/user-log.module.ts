import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogController } from '../web/rest/user-log.controller';
import { ManagementController } from '../web/rest/management.controller';
import { UserLogRepository } from '../repository/user-log.repository';
import { UserLogService } from '../service/user-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogRepository])
  ],

  controllers: [UserLogController, ManagementController],

  providers: [UserLogService],

  exports: [UserLogService]
})
export class UserLogModule { }
