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
      // } else if (group >= GROUP_QUANTITY && group < GROUP_QUANTITY * 2) {
      //   return this.getPaintingCategoryQuestions(group);
    } else {
      throw new Error('No such group!');
    }
  };

  getArtistCategoryQuestions = async (group: number): Promise<ArtistQuestions> => {
    if (group < 0 || group >= GROUP_QUANTITY) {
      throw new Error('No such group!');
    }

    if (!this.isDataLoaded) {
      await this.initData();
    }

    const result = [];

    for (let i = group * QUESTIONS_IN_GROUP; i < group * QUESTIONS_IN_GROUP + QUESTIONS_IN_GROUP; i++) {
      const { author } = this.allQuestions[i];
      const answer = author;
      const name = this.allQuestions[i].name;
      const year = this.allQuestions[i].year;

      const authors = new Set().add(answer);
      const imageNum = this.allQuestions[i].imageNum;

      while (authors.size < NUMBER_OF_POSSIBLE_ANSWERS) {
        const author = this.uniqueAuthors[Math.floor(Math.random() * this.uniqueAuthors.length)];
        if (!authors.has(author)) {
          authors.add(author);
        }
      }

      const question = {
        question: QuestionsText.ARTIST,
        answer,
        author,
        imageNum,
        name,
        year,
        authors: [...authors].sort(() => Math.random() - 0.5),
      };

      result.push(question);
    }

    return result as ArtistQuestions;
  };

  getPaintingCategoryQuestions = async (group: number): Promise<PaintingQuestions> => {
    if (group < 0 || group >= GROUP_QUANTITY) {
      throw new Error('No such group!');
    }

    if (!this.isDataLoaded) {
      await this.initData();
    }

    const result = [];

    group = group + GROUP_QUANTITY;

    for (let i = group * QUESTIONS_IN_GROUP; i < group * QUESTIONS_IN_GROUP + QUESTIONS_IN_GROUP; i++) {
      const { author, imageNum, name, year } = this.allQuestions[i];
      const questionText = QuestionsText.PAINTING.replace('{AUTHOR}', author);
      const answer = imageNum;
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
        answer,
        author,
        imageNum,
        name,
        year,
        paintings: imageNums,
      };

      result.push(question);
    }

    return result;
  };
}

export const quizData = new QuizData(URL);
