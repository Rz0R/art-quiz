import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Store } from "../../Store";

import './CategoryPage.scss';
import settingsIcon from '../../assets/images/icons/settings-icon.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';

const logo = require('../../assets/images/logo.png');

const CategoryPage: React.FC = () => {

    const store = useContext(Store);

    const { catId } = useParams();
    console.log(catId);

    const images: string[] = [];

    let i = 0;
    let j = 120;

    if (catId !== 'artists') {

        i = 120;
        j = i * 2;
    }

    for (i; i < j; i += 10) {
        console.log(i);
        const imageSrc = `/assets/img/quiz/${i}.webp`;
        images.push(imageSrc);
    }

    const itemsEls = images.map((image, ind) => {
        return (
            <Link className="item" to='/'>
                <div className="item__header">
                    <div className="item__number">{ind + 1}</div>
                    <div className="item__score">9/10</div>
                </div>

                <div className="item__picture">
                    <img src={image} alt="0" />
                </div>
            </Link>
        );
    })

    return (
        <div className="categories">
            <div className="header">
                <div className="header__title">
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header__title-name">Categories</div>
                </div>

                <div className="header__btns">
                    <Link
                        className='btn'
                        to='/'
                    >
                        <img src={homeIcon} alt="home button" />
                        <span>home</span>
                    </Link>
                    <Link
                        className='btn btn--settings'
                        to='/settings'
                    >
                        <img src={settingsIcon} alt="settings button" />
                        <span>settings</span>
                    </Link>
                </div>

            </div>

            <div className="list">
                {itemsEls}
            </div>
        </div>
    );
}

export default CategoryPage;