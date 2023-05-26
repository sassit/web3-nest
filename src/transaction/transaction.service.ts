import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    private web3Service: Web3Service,
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
  ) {}

  async getTransaction(hash: string): Promise<Transaction> {
    const transactionDB = await this.transactionModel.findOne({
      hash: hash,
    });
    if (transactionDB) {
      return transactionDB;
    } else {
      const transaction = await this.web3Service.getTransaction(hash);
      if (transaction) {
        const newTransaction = new this.transactionModel(transaction);
        return await newTransaction.save();
      }
    }
  }
}
