import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Metadata } from '../dto/upload.metadata.dto';
import { UploadNftDto } from '../dto/upload.nft.dto';

@Controller('/ipfs')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const metadata = this.generateMetadata('test', file);
    return await this.uploadService.uploadFile(metadata, file);
  }

  private generateMetadata(
    nftName: string,
    file: Express.Multer.File,
  ): Metadata {
    return {
      headers: {
        filename: file.originalname,
        contentType: file.mimetype,
        size: file.size,
      },
      path: `/${nftName}`,
    };
  }
}
