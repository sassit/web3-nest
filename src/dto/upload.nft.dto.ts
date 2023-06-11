import { IsString } from 'class-validator';

export class UploadNftDto {
  @IsString()
  readonly nftName: string;
}
