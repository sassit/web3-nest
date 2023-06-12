import { Injectable } from '@nestjs/common';
import { Metadata } from '../dto/upload.metadata.dto';
import { IpfsService } from '../ipfs/ipfs.service';
import crypto from 'crypto';

@Injectable()
export class UploadService {
  constructor(private readonly ipfsService: IpfsService) {}
  async uploadFile(
    metadata: Metadata,
    file: Express.Multer.File,
  ): Promise<any> {
    const client = this.ipfsService.getClient();
    const id = crypto.randomBytes(32).toString('hex');

    const { cid: imageCid } = await client.add(
      {
        path: `${metadata.path}/nft-${id}/image`,
        content: file.buffer as any,
      },
      { trickle: true },
    );

    const jsonMetadata = {
      name: metadata.headers.filename,
      description: metadata.description,
      image: `https://ipfs.io/ipfs/${imageCid}`,
    };

    await client.add(
      {
        path: `${metadata.path}/nft${id}/metadata`,
        content: JSON.stringify(jsonMetadata) as any,
      },
      { trickle: true },
    );

    return jsonMetadata;
  }
}
