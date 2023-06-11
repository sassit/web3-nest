import { Module } from '@nestjs/common';
import { Web3Module } from './web3/web3.module';
import { ConfigModule } from '@nestjs/config';
import { BlockController } from './block/block.controller';
import { AddressController } from './address/address.controller';
import { TransactionController } from './transaction/transaction.controller';
import { IpfsModule } from '@mfsoftworks/nestjs-ipfs';

import { AddressModule } from './address/address.module';
import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteModule } from './vote/vote.module';
import { VoteController } from './vote/vote.controller';
import { TokenModule } from './token/token.module';
import { TokenController } from './token/token.controller';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    Web3Module,
    BlockModule,
    TransactionModule,
    AddressModule,
    VoteModule,
    TokenModule,
    UploadModule,
    IpfsModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/vote'),
  ],
  controllers: [
    VoteController,
    BlockController,
    AddressController,
    TransactionController,
    TokenController,
    UploadController,
  ],
  providers: [],
})
export class AppModule {}
