import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Wallet, Contract, ethers } from 'ethers';
import ballot from '../assets/tokenized.ballot.json';
import token from '../assets/vote.token.json';

@Injectable()
export class Web3Service {
  private readonly provider: ethers.providers.BaseProvider;
  private readonly ballotContract: Contract;
  private readonly tokenContract: Contract;
  private readonly signer: Wallet;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ALCHEMY_API_KEY');
    const ballotAddress = this.configService.get<string>(
      'BALLOT_CONTRACT_ADDRESS',
    );
    const tokenContractAddress = this.configService.get<string>(
      'TOKEN_CONTRACT_ADDRESS',
    );
    this.provider = new ethers.providers.AlchemyProvider('maticmum', apiKey);
    this.ballotContract = new Contract(
      ballotAddress,
      ballot.abi,
      this.provider,
    );
    this.tokenContract = new Contract(
      tokenContractAddress,
      token.abi,
      this.provider,
    );
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    this.signer = wallet.connect(this.provider);
  }

  getBallotContract(): Contract {
    return this.ballotContract;
  }

  getTokenContract(): Contract {
    return this.tokenContract;
  }

  getWallet(): Wallet {
    return this.signer;
  }

  async getTransaction(
    hash: string,
  ): Promise<ethers.providers.TransactionReceipt> {
    const tx = await this.provider.getTransaction(hash);
    return tx.wait();
  }

  async getBlock(id: number): Promise<ethers.providers.Block> {
    return await this.provider.getBlock(id);
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  async getBalance(address: string): Promise<string> {
    return (await this.provider.getBalance(address)).toString();
  }
}
