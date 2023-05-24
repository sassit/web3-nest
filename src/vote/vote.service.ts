import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Contract } from 'ethers';

@Injectable()
export class VoteService {
  private readonly ballotContract: Contract;
  constructor(private web3Service: Web3Service) {
    this.ballotContract = web3Service.getBallotContract();
  }

  async winnerName() {
    this.ballotContract.winnerName();
  }

  async winningProposal() {
    this.ballotContract.winningProposal();
  }
}
