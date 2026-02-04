import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BankController } from './bank-config/bank/bank.controller.js';
import { BankService } from './bank-config/bank/bank.service.js';
import { PrismaService } from './prisma/prisma.service.js';

@Module({
  imports: [],
  controllers: [AppController, BankController],
  providers: [AppService, BankService, PrismaService],
})
export class AppModule {}
