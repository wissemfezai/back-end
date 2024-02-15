import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CdrController } from '../web/rest/cdr.controller';
import { CdrRepository } from '../repository/cdr.repository';
import { CdrService } from '../service/cdr.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([CdrRepository]) , HttpModule],
  controllers: [CdrController],
  providers: [CdrService , XmljsUtils],
  exports: [CdrService , XmljsUtils]
})
export class CdrModule {}
