import { Ip, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { NftModule } from 'src/nft/nft.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
  imports: [IpfsModule, NftModule, NestjsFormDataModule],
})
export class UploadModule {}
