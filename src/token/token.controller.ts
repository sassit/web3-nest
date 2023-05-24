import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { RequestTokensDto } from '../dto/request.tokens.dto';

@Controller('/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/supply')
  async getTotalSupply() {
    return await this.tokenService.getTotalSupply();
  }

  @Get('/balance/:address')
  async getBalance(@Param('address') address: string) {
    return await this.tokenService.getBalanceOf(address);
  }

  @Post('/mint')
  async mintTokens(@Body() dto: RequestTokensDto) {
    return await this.tokenService.mintTokens(dto.address, dto.amount);
  }
}
