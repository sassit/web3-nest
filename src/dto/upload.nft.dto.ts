import { IsString } from 'class-validator';

export class UploadNftDto {
  readonly nftName: string;
  readonly nftDescription: string;
  readonly address: string;
}
