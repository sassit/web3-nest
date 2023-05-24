import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':hash')
  async getBalance(@Param('hash') hash: string) {
    return await this.transactionService.getTransaction(hash);
  }
}
