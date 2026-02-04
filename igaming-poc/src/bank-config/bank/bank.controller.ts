import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateBankDTO } from '../../dto/bank.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { BankService } from './bank.service.js';

@Controller('bank')
export class BankController {
    constructor(
        private readonly bankService: BankService,
        private readonly prisma: PrismaService
    ) { }

    @Post()
    createNewRecord(@Req() request: Request, @Res() response: Response, @Body() payload: CreateBankDTO) {
        return this.bankService.createNewRecord(request, response, payload);
    }

    @Get()
    getProviders(@Req() request: Request, @Res() response: Response, @Query() filterDto: any) {
        return this.bankService.getAllRecords(filterDto, response, request);
    }

    @Get('/:id')
    getRecordById(@Req() request, @Param('id') id: string, @Res() response: Response, @Query() filterDto: any) {
        return this.bankService.getRecordById(id, request, response);
    }

    @Put('/:id')
    updateRecord(@Req() request: Request, @Param('id') recordId: number, @Res() response: Response, @Body() payload: any) {
        return this.bankService.updateRecord(recordId, request, response, payload);
    }

    // @Delete('/:id')
    // deleteRecord(@Req() request: Request, @Res() response: Response, @Param('id') recordId: number) {
    //     return this.bankService.deleteRecord(recordId, request, response);
    // }
}
