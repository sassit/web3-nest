import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Contract, ethers } from 'ethers';
import { Metadata } from 'src/dto/upload.metadata.dto';

@Injectable()
export class NftService {
  private readonly contract: Contract;
  private id = 0;
  constructor(private readonly web3Service: Web3Service) {
    this.contract = this.web3Service.getNftContract();
  }
  // address account, uint256 id, uint256 amount, bytes memory data
  async mint(address: string, metadata: Metadata) {
    const payload = JSON.stringify(metadata);
    console.log(address);
    return this.contract
      .connect(this.web3Service.getWallet())
      .mint(
        address,
        ethers.BigNumber.from(this.id++),
        1,
        ethers.utils.toUtf8Bytes(payload),
      );
  }
}
