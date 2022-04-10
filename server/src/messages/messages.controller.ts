import { Controller, Get, Logger, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UnauthorizedErrorResponse } from '@src/utils/http/UnauthorizedResponse';
import { GetManyMessagesDto } from './dto/getManyMessages.dto';
import { MessageResponse } from './dto/message.response';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@ApiUnauthorizedResponse({ type: UnauthorizedErrorResponse })
@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name);
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  @ApiOkResponse({ type: MessageResponse })
  public async findOne(@Param('id') id: string): Promise<MessageResponse> {
    const parsedId = +id;
    const message = await this.messagesService.findOne(parsedId);
    if (message) {
      return message;
    }

    throw new NotFoundException(`Could not find message with id ${id}`);
  }

  @Get()
  @ApiOkResponse({ type: [MessageResponse] })
  public async findMany(@Param() query: GetManyMessagesDto) {
    const executionStart = process.hrtime.bigint();

    const messages = await this.messagesService.findMany({ offset: query.offset || 0, limit: query.limit || 20 });

    const executionEnd = process.hrtime.bigint();
    this.logger.debug(`Getting messages execution time: ${Number(executionEnd - executionStart) / 1e6}ms`);
    return messages;
  }
}
