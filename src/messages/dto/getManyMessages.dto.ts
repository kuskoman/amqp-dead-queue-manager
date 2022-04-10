import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetManyMessagesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  offset?: number;
}
