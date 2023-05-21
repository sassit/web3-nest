import { Controller, Get } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('/vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('/winningProposal')
  async winningProposal() {
    return await this.voteService.winningProposal();
  }

  @Get('/winnerName')
  async winnerName() {
    return await this.voteService.winnerName();
  }
}
