import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorResponse {
  @ApiProperty({ example: 401 })
  statusCode!: 401;

  @ApiProperty({ example: 'unauthorized' })
  message!: 'unauthorized';
}
