import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallsController } from '../web/rest/calls.controller';
import { CallsRepository } from '../repository/calls.repository';
import { CallsService } from '../service/calls.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([CallsRepository]) , HttpModule ],
  controllers: [CallsController],
  providers: [CallsService , XmljsUtils],
  exports: [CallsService , XmljsUtils]
})
export class CallsModule {}