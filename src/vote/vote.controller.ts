import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('/vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
}
