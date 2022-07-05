import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';

import { getImagesForCategoriesAction } from '../../store/serviceActions';
import { imagesLoadingIdle } from '../../store/categoryState/categoryState';
import ErrorPage from '../ErrorPage';
import Loader from '../Loader';
import GroupItem from './GroupItem';
import { SettingsButton } from '../SettingsButton';
import { createImageUrl } from '../../utils/common';
import { CategoryType, LoadingStatus } from '../../consts/const';
import { GROUP_QUANTITY, AppRoute, CATEGORY_PAGE_TEXT } from '../../consts/const';

const CategoryPage: React.FC = () => {
  const { catId } = useParams();
  const { answers } = useAppSelector((state) => state.RESULTS);
  const { images, loadingStatus, error } = useAppSelector((state) => state.CATEGORY);
  const { language } = useAppSelector((state) => state.SETTINGS);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) {
      dispatch(getImagesForCategoriesAction(catId));
    }
    return () => {
      dispatch(imagesLoadingIdle());
    };
  }, [catId, dispatch]);

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS)) {
    return <ErrorPage errorMessage='404' />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (loadingStatus === LoadingStatus.LOADING || loadingStatus === LoadingStatus.IDLE) {
    return <Loader />;
  }

  let min = 0;

  if (catId === CategoryType.PAINTINGS) {
    min = GROUP_QUANTITY;
  }

  const itemsEls = images.map((image, ind) => {
    const imageSrc = createImageUrl(image);
    const isAnswered = Boolean(answers[ind + min]);
    const score = (isAnswered && answers[ind + min]?.filter((item) => item === 'CORRECT').length) || 0;
    return <GroupItem key={ind} categoryId={catId} groupNumber={ind + 1} imageSrc={imageSrc} isAnswered={isAnswered} score={score} />;
  });

  return (
    <div className='categories'>
      <div className='header'>
        <Link className='logo header__logo' to={AppRoute.Root}></Link>
        <Link className='btn btn--home header__left-element' to={AppRoute.Root}>
          home
        </Link>
        <div className='header__title'>{CATEGORY_PAGE_TEXT[language].title}</div>
        <SettingsButton className='header__right-element' />
      </div>

      <div className='list'>
        <div className='list__wrapper'>{itemsEls}</div>
      </div>
    </div>
  );
};

export default CategoryPage;
