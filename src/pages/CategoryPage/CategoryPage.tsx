import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import './CategoryPage.scss';

import settingsIcon from '../../assets/images/icons/settings-icon.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';
const logo = require('../../assets/images/logo.png');

const CategoryPage: React.FC = () => {

    const { catId } = useParams();
    console.log(catId);

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
                <Link className="item" to='/'>
                    <div className="item__header">
                        <div className="item__number">1</div>
                        <div className="item__score">9/10</div>
                    </div>

                    <div className="item__picture">
                        <img src="/assets/img/quiz/0.webp" alt="0" />
                    </div>
                </Link>

                <Link className="item" to='/'>
                    <div className="item__header">
                        <div className="item__number">1</div>
                        <div className="item__score">9/10</div>
                    </div>

                    <div className="item__picture">
                        <img src="/assets/img/quiz/0.webp" alt="0" />
                    </div>
                </Link>

                <Link className="item" to='/'>
                    <div className="item__header">
                        <div className="item__number">1</div>
                        <div className="item__score">9/10</div>
                    </div>

                    <div className="item__picture">
                        <img src="/assets/img/quiz/0.webp" alt="0" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CategoryPage;