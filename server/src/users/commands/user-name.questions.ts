import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'name' })
export class UserNameQuestions {
  @Question({
    message: 'Enter name of user you want to create: ',
    name: 'name',
  })
  parseName(val: string) {
    return val;
  }
}
