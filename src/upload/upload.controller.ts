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
import { NftService } from 'src/nft/nft.service';

@Controller('/ipfs')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly nftService: NftService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UploadNftDto,
  ): Promise<string> {
    const metadata = this.generateMetadata(data, image);
    const nftMetadata = await this.uploadService.uploadFile(metadata, image);
    return await this.nftService.mint(data.address, nftMetadata);
  }

  private generateMetadata(
    data: UploadNftDto,
    file: Express.Multer.File,
  ): Metadata {
    return {
      headers: {
        filename: file.originalname,
        contentType: file.mimetype,
        size: file.size,
      },
      path: `/${data.nftName}`,
      description: `/${data.nftDescription}`,
    };
  }
}
