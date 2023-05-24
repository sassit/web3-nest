import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import Web3Utils from 'src/web3/web3-utils';

@Injectable()
export class AddressValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(address: string, metadata: ArgumentMetadata) {
    if (!Web3Utils.isValidAddress(address)) {
      throw new BadRequestException('Invalid address');
    }
    return address;
  }
}
