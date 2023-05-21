import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class VoteService {
  constructor(private web3Service: Web3Service) {}
  async winnerName() {
    // return await this.web3Service.;
  }
  async winningProposal() {
    throw new Error('Method not implemented.');
  }
}
