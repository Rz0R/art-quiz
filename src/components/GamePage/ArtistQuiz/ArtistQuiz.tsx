import { Link } from 'react-router-dom';
import { ArtistQuestions } from '../../../types/questions';
import { logo, homeIcon } from '../../../consts/assetsPaths';
import { createImageUrl } from '../../../utils/common';

const ArtistQuiz = (questions: ArtistQuestions): JSX.Element => {
  const { question, imageNum, authors } = questions[0];

  const imageUrl = createImageUrl(imageNum);

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
        <div className='header__question'>{question}</div>
      </div>
      <div className='game__picture'>
        <img src={imageUrl} alt='' />
        <div className='pagination'>
          {/* <div className='pagination__item pagination__item--wrong' />
          <div className='pagination__item pagination__item--correct' />
          <div className='pagination__item' /> */}
          {questions.map((_, ind) => (
            <div key={`pagItem-${ind}`} className='pagination__item' />
          ))}
        </div>
      </div>
      <div className='game__answers answers'>
        <ul className='answers--wrapper'>
          {authors.map((author, ind) => (
            <li key={`${author}-${ind}`} className='answers__answer'>
              {author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistQuiz;
