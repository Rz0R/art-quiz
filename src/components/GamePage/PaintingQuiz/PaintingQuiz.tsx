import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { PaintingQuestion } from '../../../types/questions';
import { CategoryType, ANSWERS_TYPE, AppRoute } from '../../../consts/const';
import { CountdownTimer } from '../CoundownTimer';
import Pictures from './Pictures';

type PaintingQuizProps = {
  paintingQuestion: PaintingQuestion;
  pagination: ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, painting: string) => void;
  isTimerOn: boolean;
};

const PaintingQuiz = ({ paintingQuestion, pagination, onAnswerBtnClick, isTimerOn }: PaintingQuizProps) => {
  const { question, paintings } = paintingQuestion;

  return (
    <>
      <div
        className={classnames('game__header', {
          'game__header--with-timer': isTimerOn,
        })}
      >
        <Link className='logo game__logo' to={AppRoute.Root}></Link>
        {isTimerOn && <CountdownTimer />}
        <Link className='btn btn--categories game__settings-btn' to={`${AppRoute.Category}/${CategoryType.PAINTINGS}`}>
          categories
        </Link>
        <div className='game__question'>{question}</div>
      </div>
      <Pictures paintings={paintings} pagination={pagination} onAnswerBtnClick={onAnswerBtnClick} />
    </>
  );
};

export default PaintingQuiz;
