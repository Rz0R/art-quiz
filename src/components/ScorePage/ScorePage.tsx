import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadScoreQuestionsAction } from '../../store/serviceActions';
import ScoreGroupItem from './ScoreGroupItem';
import Loader from '../Loader';
import { logo } from '../../consts/assetsPaths';
import { CategoryType, GROUP_QUANTITY } from '../../consts/const';
import ErrorPage from '../ErrorPage';

const ScorePage = () => {
  const { catId = CategoryType.ARTISTS, groupId } = useParams();
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
      <div className='header header--categories'>
        <div className='header__title'>
          <Link className='logo' to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <div className='header__title-name'>Score</div>
        </div>

        <div className='header__btns'>
          <Link className='btn btn--home' to='/'>
            home
          </Link>
          <Link className='btn btn--settings' to='/settings'>
            settings
          </Link>
        </div>
      </div>

      <div className='list list--score'>{scoreGroupItems}</div>
    </div>
  );
};

export default ScorePage;
