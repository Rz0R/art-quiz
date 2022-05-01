import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { loadQuestionsAction } from '../../store/serviceActions';
import { getQuestions } from '../../store/gameState/selectors';
import { Link } from 'react-router-dom';
import { logo, homeIcon } from '../../consts/assetsPaths';

const GamePage: React.FC = () => {
  const { groupId = '' } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuestionsAction(Number(groupId)));
  }, [groupId, dispatch]);

  const questions = useAppSelector(getQuestions);

  console.log(questions);

  return (
    <div className='game'>
      <div className='header header--game'>
        <div className='header__top'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <Link to='/' className='btn'>
            <img src={homeIcon} alt='home button' />
            <span>home</span>
          </Link>
        </div>
        <div className='header__question'>Who is the author of this picture ?</div>
      </div>
      <div className='game__picture'>
        <img src='/assets/img/quiz/0.webp' alt='' />
        <div className='pagination'>
          <div className='pagination__item pagination__item--wrong' />
          <div className='pagination__item pagination__item--correct' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
          <div className='pagination__item' />
        </div>
      </div>
      <div className='game__answers answers'>
        <ul className='answers--wrapper'>
          <li className='answers__answer'>Van Gogh</li>
          <li className='answers__answer'>J. Vermeer</li>
          <li className='answers__answer'>P. Rubens</li>
          <li className='answers__answer'>V. Serov</li>
        </ul>
      </div>
    </div>
  );
};

export default GamePage;
