import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadScoreQuestionsAction } from '../../store/serviceActions';
import ScoreGroupItem from './ScoreGroupItem';
import Loader from '../Loader';
import { CategoryType, GROUP_QUANTITY } from '../../consts/const';
import ErrorPage from '../ErrorPage';

const ScorePage = () => {
  const { catId, groupId } = useParams();
  const { questions, isLoading, error } = useAppSelector((state) => state.SCORES);
  const { answers } = useAppSelector((state) => state.RESULTS);
  const dispatch = useAppDispatch();

  let groupNumber = Number(groupId);

  if (catId === CategoryType.PAINTINGS) {
    groupNumber = GROUP_QUANTITY + groupNumber;
  }

  useEffect(() => {
    if (catId === CategoryType.ARTISTS) {
      dispatch(loadScoreQuestionsAction(groupNumber));
    } else {
      dispatch(loadScoreQuestionsAction(groupNumber));
    }
  }, [catId, groupId, groupNumber, dispatch]);

  const currentAnswers = answers[groupNumber - 1];

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) || !currentAnswers) {
    return <ErrorPage errorMessage='404' />;
  }

  if (isLoading || questions.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  const scoreGroupItems = questions.map((question, ind) => (
    <ScoreGroupItem key={`question-${ind}`} question={question} questionNumber={ind + 1} answer={currentAnswers[ind]} />
  ));

  return (
    <div className='scores'>
      <div className='header'>
        <Link className='logo header__logo' to='/'></Link>
        <Link className='btn btn--home header__left-element' to='/'>
          home
        </Link>
        <div className='header__title'>Score</div>
        <Link className='btn btn--categories header__right-element' to={`/category/${catId}`}>
          categories
        </Link>
      </div>

      <div className='list list--score'>
        <div className='list__wrapper'>{scoreGroupItems}</div>
      </div>
    </div>
  );
};

export default ScorePage;
