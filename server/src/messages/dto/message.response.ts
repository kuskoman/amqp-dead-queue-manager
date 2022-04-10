import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  content!: string;

  @ApiProperty({ example: JSON.stringify({ propertyA: 'value' }) })
  properties!: string;

  @ApiProperty({ example: JSON.stringify({ fieldA: 'value' }) })
  fields!: string;
}
