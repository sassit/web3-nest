import { Ip, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { IpfsModule } from 'src/ipfs/ipfs.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
  imports: [IpfsModule],
})
export class UploadModule {}
