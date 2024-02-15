import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from '../web/rest/vendor.controller';
import { VendorRepository } from '../repository/vendor.repository';
import { VendorService } from '../service/vendor.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([VendorRepository]) , HttpModule],
  controllers: [VendorController],
  providers: [VendorService , XmljsUtils],
  exports: [VendorService , XmljsUtils]
})
export class VendorModule {}
