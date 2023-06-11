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

@Controller('/ipfs')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadNftDto,
  ) {
    const metadata = this.generateMetadata(dto.nftName, file);
    this.uploadService.uploadFile(metadata, file);
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
