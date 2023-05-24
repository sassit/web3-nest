import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Contract, ethers } from 'ethers';

@Injectable()
export class TokenService {
  private readonly contract: Contract;
  constructor(private web3Service: Web3Service) {
    this.contract = this.web3Service.getTokenContract();
  }

  getAddress(): string {
    return this.contract.address;
  }

  async getTotalSupply() {
    this.contract.totalSupply();
  }

  async getBalanceOf(address: string) {
    this.contract.balanceOf(address);
  }

  async mintTokens(address: string, amount: string) {
    return this.contract
      .connect(this.web3Service.getWallet())
      .mint(address, ethers.utils.parseUnits(amount));
  }
}
