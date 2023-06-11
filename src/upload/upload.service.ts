import { IpfsService } from '@mfsoftworks/nestjs-ipfs';
import { Injectable } from '@nestjs/common';
import { Metadata } from '../dto/upload.metadata.dto';

@Injectable()
export class UploadService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private ipfService: IpfsService) {}

  async uploadFile(
    metadata: Metadata,
    file: Express.Multer.File,
  ): Promise<string> {
    const node = await this.ipfService.getNode();
    const uuid = self.crypto.randomUUID();

    const { cid: imageCid } = await node.add(
      {
        path: `${metadata.path}/nft${uuid}/image`,
        content: file.buffer as any,
      },
      { trickle: true },
    );

    const jsonMetadata = {
      name: metadata.headers.filename,
      image_cid: imageCid.toString(),
    };

    const { cid } = await node.add(
      {
        path: `${metadata.path}/nft${uuid}/metadata`,
        content: JSON.stringify(jsonMetadata) as any,
      },
      { trickle: true },
    );

    return cid.toString();
  }
}
