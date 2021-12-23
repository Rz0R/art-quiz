import React from "react";
import { Link } from 'react-router-dom';
import './GroupItem.scss';

interface IGroupItem {
    groupNumber: string,
    image: string
}

const GroupItem: React.FC<IGroupItem> = ({ groupNumber, image }) => {

    return (
        <Link className="item" to='/'>
            <div className="item__header">
                <div className="item__number">{groupNumber}</div>
                <div className="item__score">9/10</div>
            </div>
            <div className="item__picture">
                <img src={image} alt=""/>
            </div>
        </Link>
    )
}

export default GroupItem;