import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GroupItem from './GroupItem';
import { logo, settingsIcon, homeIcon } from '../../consts/assetsPaths';

const CategoryPage: React.FC = () => {
  const { catId = 'artists' } = useParams();

  const images: string[] = [];

  let i = 0;
  let j = 120;

  if (catId !== 'artists') {
    i = 120;
    j = i * 2;
  }

  for (i; i < j; i += 10) {
    const imageSrc = `/assets/img/quiz/${i}.webp`;
    images.push(imageSrc);
  }

  const itemsEls = images.map((image, ind) => <GroupItem key={ind} categoryId={catId} groupNumber={(ind + 1).toString()} image={image} />);

  return (
    <div className='categories'>
      <div className='header'>
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
