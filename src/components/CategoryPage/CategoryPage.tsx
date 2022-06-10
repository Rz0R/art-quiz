import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { getImagesForCategoriesAction } from '../../store/serviceActions';
import ErrorPage from '../ErrorPage';
import GroupItem from './GroupItem';
import { createImageUrl } from '../../utils/common';
import { CategoryType } from '../../consts/const';
import { GROUP_QUANTITY, QUESTIONS_IN_GROUP, NUMBER_OF_ALL_GROUPS } from '../../consts/const';
import { useEffect } from 'react';

const CategoryPage: React.FC = () => {
  const { catId } = useParams();
  const { answers } = useAppSelector((state) => state.RESULTS);

  useEffect(() => {
    if (catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) {
      getImagesForCategoriesAction(catId);
    }
  }, [catId]);

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS)) {
    return <ErrorPage errorMessage='404' />;
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
      <div className='header'>
        <Link className='logo header__logo' to='/'></Link>
        <Link className='btn btn--home header__home-btn' to='/'>
          home
        </Link>
        <div className='header__title'>Categories</div>
        <Link className='btn btn--settings header__settings-btn' to='/settings'>
          settings
        </Link>
      </div>

      <div className='list'>
        <div className='list__wrapper'>{itemsEls}</div>
      </div>
    </div>
  );
};

export default CategoryPage;
