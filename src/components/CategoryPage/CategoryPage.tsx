import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import GroupItem from './GroupItem';
import { logo, settingsIcon, homeIcon } from '../../consts/assetsPaths';
import { createImageUrl } from '../../utils/common';
import { CategoryType } from '../../consts/const';
import { GROUP_QUANTITY, QUESTIONS_IN_GROUP, NUMBER_OF_ALL_GROUPS } from '../../consts/const';

const CategoryPage: React.FC = () => {
  const { catId = CategoryType.ARTISTS } = useParams();
  const { answers } = useAppSelector((state) => state.RESULTS);

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS)) {
    return <h2>404</h2>;
  }

  let min = 0;
  let max = GROUP_QUANTITY;

  if (catId === CategoryType.PAINTINGS) {
    min = GROUP_QUANTITY;
    max = NUMBER_OF_ALL_GROUPS;
  }

  const itemsEls = Array.from({ length: max - min }, (_, ind) => {
    const imageSrc = createImageUrl(String(ind * QUESTIONS_IN_GROUP + min * QUESTIONS_IN_GROUP));
    const isAnswered = Boolean(answers[ind + min]);
    const score = (isAnswered && answers[ind + min]?.filter((item) => item === 'CORRECT').length) || 0;
    return <GroupItem key={ind} categoryId={catId} groupNumber={ind + 1} imageSrc={imageSrc} isAnswered={isAnswered} score={score} />;
  });

  return (
    <div className='categories'>
      <div className='header header--categories'>
        <div className='header__title'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='header__title-name'>Categories</div>
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

      <div className='list'>{itemsEls}</div>
    </div>
  );
};

export default CategoryPage;
