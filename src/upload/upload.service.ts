import { Injectable } from '@nestjs/common';
import { Metadata } from '../dto/upload.metadata.dto';
import { IpfsService } from '../ipfs/ipfs.service';

@Injectable()
export class UploadService {
  constructor(private readonly ipfsService: IpfsService) {}
  async uploadFile(
    metadata: Metadata,
    file: Express.Multer.File,
  ): Promise<string> {
    const client = this.ipfsService.getClient();
    const added = await client.add(file.buffer);
    return added.cid.toString();
  }
}
