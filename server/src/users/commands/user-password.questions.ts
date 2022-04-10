import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'password' })
export class UserPasswordQuestions {
  @Question({
    message: 'Enter password: ',
    name: 'password',
  })
  parsePassword(val: string) {
    return val;
  }
}
