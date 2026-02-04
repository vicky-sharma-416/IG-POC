import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';

@Injectable()
export class TransactionService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createNewRecord(request: any, response: any, payload: any) {
        try {
            this.prisma.statement.create({
                data: {
                    ...payload
                }
            });
        } catch (error) {
            console.error('Error creating statement record:', error);
            throw response.status(400).json({ message: 'Failed to create statement record', error: error.message });
        }
    }

    async getAllRecords(filterDto: any, response: any, request: any) {
        try {
            this.prisma.statement.findMany();
        } catch (error) {
            console.error('Error fetching bank record:', error);
            throw response.status(400).json({ message: 'Failed to fetching bank record', error: error.message });
        }
    }

    async getRecordById(id: string, request: any, response: any) {
        try {
            this.prisma.statement.findUnique({
                where: { id: Number(id) }
            });
        } catch (error) {
            console.error('Error fetching statement record by ID:', error);
            throw response.status(400).json({ message: 'Failed to fetching statement record by ID', error: error.message });
        }
    }

    async updateRecord(recordId: number, request: any, response: any, payload: any) {
        try {
            this.prisma.statement.update({
                where: { id: recordId },
                data: {
                    ...payload
                }
            });
        } catch (error) {
            console.error('Error updating statement record:', error);
            throw response.status(400).json({ message: 'Failed to update statement record', error: error.message });
        }
    }

    async deleteRecord(recordId: number, request: any, response: any, ) {
        try {
            this.prisma.statement.delete({
                where: { id: recordId }
            });
        } catch (error) {
            console.error('Error deleting statement record:', error);
            throw response.status(400).json({ message: 'Failed to delete statement record', error: error.message });
        }
    }
}

