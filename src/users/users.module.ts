import { Module } from '@nestjs/common';
import { CryptoModule } from '@src/crypto/crypto.module';
import { CreateUserCommand } from './commands/create-user.command';
import { UserNameQuestions } from './commands/user-name.questions';
import { UserPasswordQuestions } from './commands/user-password.questions';
import { UsersService } from './users.service';

const questions = [UserNameQuestions, UserPasswordQuestions];

@Module({
  providers: [UsersService, CreateUserCommand, ...questions],
  exports: [UsersService],
  imports: [CryptoModule],
})
export class UsersModule {}
