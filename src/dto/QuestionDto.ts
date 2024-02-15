import { IQuestion } from '../models/question';

interface IQuestionDto {
  getQuestion(): IQuestion;
  //   setQuestion(question: IQuestion): void;
}

// interface ISetQuestion {
//   type: string;
//   payload: IQuestion;
// }

export class QuestionDto implements IQuestionDto {
  private question: IQuestion;

  constructor(question: IQuestion) {
    this.question = question;
  }

  public getQuestion(): IQuestion {
    return this.question;
  }

  //   public setQuestion(question: ISetQuestion): void {
  //     this.question = question;
  //   }
}
