import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { UsersService } from '../users.service';

@Command({ name: 'create-user', arguments: '[username]', description: 'Allows you to create user' })
export class CreateUserCommand implements CommandRunner {
  constructor(private readonly usersService: UsersService, private readonly inquirerService: InquirerService) {}

  public async run(inputs: string[], _options: Record<string, string>): Promise<void> {
    let userName = inputs[0];
    if (!userName) {
      userName = (await this.inquirerService.ask<UsernameQuestion>('name', undefined)).name;
    }

    const passwordQuestionAnswer = await this.inquirerService.ask<PasswordQuestion>('password', undefined);
    const password = passwordQuestionAnswer.password;

    const user = await this.usersService.create({ name: userName, password });
    const { passwordDigest, ...userWithoutDigest } = user;
    console.log(JSON.stringify(userWithoutDigest));
  }
}

interface PasswordQuestion {
  password: string;
}

interface UsernameQuestion {
  name: string;
}
