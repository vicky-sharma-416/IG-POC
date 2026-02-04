// src/admin-logs/dto/register-user.dto.ts
import { Transform, Type } from 'class-transformer';
import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateBankDTO {
  @IsNotEmpty()
  tenantId: Number;

  @IsNotEmpty()
  name: String;

  @IsOptional()
  @IsNotEmpty()
  uniqueCode: String;

  @IsOptional()
  @IsNotEmpty()
  bankBranch: String;

  @IsOptional()
  @IsNotEmpty()
  ifscCode: String;

  @IsOptional()
  @IsNotEmpty()
  additionalInfo: String;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toUpperCase())
  status: string;

  @IsNotEmpty()
  @Min(10)
  @Max(100)
  inwardLimit: Number;

  @IsNotEmpty()
  outwardLimit: Number;
}

export class UpdateBankDTO extends PartialType(CreateBankDTO) {}
