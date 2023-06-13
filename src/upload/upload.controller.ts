import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Metadata } from '../dto/upload.metadata.dto';
import { UploadNftDto } from '../dto/upload.nft.dto';
import { NftService } from 'src/nft/nft.service';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('/ipfs')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly nftService: NftService,
  ) {}
  @Post('upload')
  @FormDataRequest({ storage: FileSystemStoredFile })
  async uploadFile(@Body() data: UploadNftDto): Promise<string> {
    console.log(data);
    const metadata = this.generateMetadata(data);
    const nftMetadata = await this.uploadService.uploadFile(
      metadata,
      data.image,
    );
    return await this.nftService.mint(data.address, nftMetadata);
  }

  private generateMetadata(data: UploadNftDto): Metadata {
    return {
      headers: {
        filename: data.image.path,
        contentType: data.image.mimetype,
        size: data.image.size,
      },
      path: `/${data.nftName}`,
      description: `/${data.nftDescription}`,
    };
  }
}
