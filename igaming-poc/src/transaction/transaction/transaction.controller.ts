import { Body, Controller, Param, Post, Put, Req, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service.js';

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
    ) { }

    @Post()
    createNewRecord(@Req() request: Request, @Res() response: Response, @Body() payload: any) {
        return this.transactionService.createNewRecord(request, response, payload);
    }

    // @Get()
    // getProviders(@Req() request: Request, @Res() response: Response, @Query() filterDto: any) {
    //     return this.transactionService.getAllRecords(filterDto, response, request);
    // }

    // @Get('/:id')
    // getRecordById(@Req() request, @Param('id') id: string, @Res() response: Response, @Query() filterDto: any) {
    //     return this.transactionService.getRecordById(id, request, response);
    // }

    @Put('/:id')
    updateRecord(@Req() request: Request, @Param('id') recordId: number, @Res() response: Response, @Body() payload: any) {
        return this.transactionService.updateRecord(recordId, request, response, payload);
    }

    // @Delete('/:id')
    // deleteRecord(@Req() request: Request, @Res() response: Response, @Param('id') recordId: number) {
    //     return this.transactionService.deleteRecord(recordId, request, response);
    // }
}
