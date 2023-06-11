import { FileHeaders } from './upload.file.dto';

export interface Metadata {
  headers?: FileHeaders;
  path: string;
}
