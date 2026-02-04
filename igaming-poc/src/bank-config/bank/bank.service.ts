import { Injectable } from '@nestjs/common';
import { CreateBankDTO } from '../../dto/bank.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { HttpService } from '@nestjs/axios';
import { ASYNC_API_CALL } from 'src/async-api-call.js';

@Injectable()
export class BankService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    async createNewRecord(request: any, response: any, payload: CreateBankDTO) {
        try {
            let createdRecord = await this.prisma.tenantBank.create({
                data: {
                    ...payload
                }
            });

            // This function is used to insert transaction data after an entry in parallel way
            ASYNC_API_CALL((process.env.SYSTEM_URL || "http://localhost:3001"), request.headers, "POST", 
                {...payload, ...createdRecord}, 'WILL_BE_JWT_TOKEN', `transaction`, this.httpService);

            return response.status(201).json(createdRecord);
        } catch (error) {
            console.error('Error creating bank record:', error);
            throw response.status(400).json({ message: 'Failed to create bank record', error: error.message });
        }
    }

    async getAllRecords(filterDto: any, response: any, request: any) {
        try {
            const records = await this.prisma.tenantBank.findMany();
            return response.status(200).json(records);
        } catch (error) {
            console.error('Error fetching bank record:', error);
            throw response.status(400).json({ message: 'Failed to fetching bank record', error: error.message });
        }
    }

    async getRecordById(id: string, request: any, response: any) {
        try {
            let record = await this.prisma.tenantBank.findUnique({
                where: { id: Number(id) }
            });
            return response.status(200).json(record);
        } catch (error) {
            console.error('Error fetching bank record by ID:', error);
            throw response.status(400).json({ message: 'Failed to fetching bank record by ID', error: error.message });
        }
    }

    async updateRecord(recordId: number, request: any, response: any, payload: any) {
        try {
            let updatedRecord = await this.prisma.tenantBank.update({
                where: { id: recordId },
                data: {
                    ...payload
                }
            });
            return response.status(200).json(updatedRecord);
        } catch (error) {
            console.error('Error updating bank record:', error);
            throw response.status(400).json({ message: 'Failed to update bank record', error: error.message });
        }
    }

    async deleteRecord(recordId: number, request: any, response: any, ) {
        try {
            let deletedRecord = await this.prisma.tenantBank.delete({
                where: { id: recordId }
            });
            return response.status(200).json(deletedRecord);
        } catch (error) {
            console.error('Error deleting bank record:', error);
            throw response.status(400).json({ message: 'Failed to delete bank record', error: error.message });
        }
    }
}
