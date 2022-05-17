import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadScoreQuestionsAction } from '../../store/serviceActions';
import ScoreGroupItem from './ScoreGroupItem';
import Loader from '../Loader';
import { logo, settingsIcon, homeIcon } from '../../consts/assetsPaths';
import { CategoryType, GROUP_QUANTITY } from '../../consts/const';

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

  console.log(groupNumber, answers[groupNumber]);

  const currentAnswers = answers[groupNumber - 1];

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) || !currentAnswers) {
    return <h2>404</h2>;
  }

  if (isLoading || questions.length === 0) {
    console.log('Loader');
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const scoreGroupItems = questions.map((question, ind) => (
    <ScoreGroupItem key={`question-${ind}`} question={question} questionNumber={ind + 1} answer={currentAnswers[ind]} />
  ));

  return (
    <div className='scores'>
      <div className='header header--categories'>
        <div className='header__title'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='header__title-name'>Score</div>
        </div>

        <div className='header__btns'>
          <Link className='btn' to='/'>
            <img src={homeIcon} alt='home button' />
            <span>home</span>
          </Link>
          <Link className='btn btn--settings' to='/settings'>
            <img src={settingsIcon} alt='settings button' />
            <span>settings</span>
          </Link>
        </div>
      </div>

      <div className='list list--score'>{scoreGroupItems}</div>
    </div>
  );
};

export default ScorePage;
