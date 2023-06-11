import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPFSHTTPClient, create } from 'ipfs-http-client';

@Injectable()
export class IpfsService {
  private client: any;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('INFURA_API_KEY');
    const apiSecret = this.configService.get<string>('INFURA_API_SECRET');
    const auth =
      'Basic ' + Buffer.from(apiKey + ':' + apiSecret).toString('base64');
    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
  }

  getClient(): IPFSHTTPClient {
    return this.client;
  }
}
