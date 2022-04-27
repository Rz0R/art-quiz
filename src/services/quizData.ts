import { GROUP_QUANTITY, QUESTIONS_IN_GROUP, NUMBER_OF_POSSIBLE_ANSWERS, QuestionsText } from '../consts/const';

interface IQuestion {
  author: string;
  name: string;
  year: string;
  imageNum: string;
}

export class QuizData {
  private allQuestions: IQuestion[] = [];
  private uniqueAuthors: string[] = [];
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  initData = async () => {
    const response = await fetch(this.url);
    const data = (await response.json()) as IQuestion[];

    this.allQuestions = data;
    this.uniqueAuthors = [...new Set(data.map((question) => question.author))];
  };

  getQuestionsByCategory = (group: number) => {
    if (group < GROUP_QUANTITY) {
      return this.getArtistCategoryQuestions(group);
    } else if (group >= GROUP_QUANTITY && group < GROUP_QUANTITY * 2) {
      return this.getPaintingCategoryQuestions(group);
    } else {
      throw new Error('No such group!');
    }
  };

  private getArtistCategoryQuestions = (group: number) => {
    const result = [];

    for (let i = group * QUESTIONS_IN_GROUP; i < group * QUESTIONS_IN_GROUP + QUESTIONS_IN_GROUP; i++) {
      const authors = new Set().add(this.allQuestions[i].author);

      while (authors.size < NUMBER_OF_POSSIBLE_ANSWERS) {
        const author = this.uniqueAuthors[Math.floor(Math.random() * this.uniqueAuthors.length)];
        if (!authors.has(author)) {
          authors.add(author);
        }
      }

      const question = {
        question: QuestionsText.ARTIST,
        authors: [...authors].sort(() => Math.random() - 0.5),
      };

      result.push(question);
    }

    return result;
  };

  private getPaintingCategoryQuestions = (group: number) => {
    const result = [];

    for (let i = group * QUESTIONS_IN_GROUP; i < group * QUESTIONS_IN_GROUP + QUESTIONS_IN_GROUP; i++) {
      const { author, imageNum } = this.allQuestions[i];
      const questionText = QuestionsText.PAINTING.replace('{AUTHOR}', author);
      const imageNums = [];
      imageNums.push(imageNum);
      const authors = new Set().add(author);

      while (authors.size < NUMBER_OF_POSSIBLE_ANSWERS) {
        const author = this.uniqueAuthors[Math.floor(Math.random() * this.uniqueAuthors.length)];
        if (!authors.has(author)) {
          authors.add(author);
        }
      }

      const randomAuthors = [...authors].slice(1);

      for (const author of randomAuthors) {
        const allPicturesByAuthor = [];
        for (const question of this.allQuestions) {
          if (question.author === author) {
            allPicturesByAuthor.push(question.imageNum);
          }
        }

        const randomPictureByAuthor = allPicturesByAuthor[Math.floor(Math.random() * allPicturesByAuthor.length)];
        imageNums.push(randomPictureByAuthor);
      }

      imageNums.sort(() => Math.random() - 0.5);

      const question = {
        question: questionText,
        imageNums,
      };

      result.push(question);
    }

    return result;
  };
}
