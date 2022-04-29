import { GROUP_QUANTITY, QUESTIONS_IN_GROUP, NUMBER_OF_POSSIBLE_ANSWERS, QuestionsText } from '../consts/const';
import { URL } from '../consts/const';
import { Questions, ArtistQuestions, PaintingQuestions } from '../types/questions';

class QuizData {
  private isDataLoaded = false;
  private allQuestions: Questions = [];
  private uniqueAuthors: string[] = [];
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  initData = async () => {
    try {
      const response = await fetch(this.url);
      const data = (await response.json()) as Questions;

      this.allQuestions = data;
      this.uniqueAuthors = [...new Set(data.map((question) => question.author))];
      this.isDataLoaded = true;
    } catch (err) {
      this.isDataLoaded = false;
      throw err;
    }
  };

  getQuestionsByCategory = async (group: number) => {
    if (!this.isDataLoaded) {
      await this.initData();
    }

    if (group < GROUP_QUANTITY) {
      return this.getArtistCategoryQuestions(group);
    } else if (group >= GROUP_QUANTITY && group < GROUP_QUANTITY * 2) {
      return this.getPaintingCategoryQuestions(group);
    } else {
      throw new Error('No such group!');
    }
  };

  private getArtistCategoryQuestions = (group: number): ArtistQuestions => {
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

    return result as ArtistQuestions;
  };

  private getPaintingCategoryQuestions = (group: number): PaintingQuestions => {
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
        paintings: imageNums,
      };

      result.push(question);
    }

    return result;
  };
}

export const quizData = new QuizData(URL);
