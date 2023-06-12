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
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('/ipfs')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UploadNftDto,
  ): Promise<string> {
    console.log('data', data);
    console.log('image', image);
    const metadata = this.generateMetadata(data.nftName, image);
    return await this.uploadService.uploadFile(metadata, image);
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
