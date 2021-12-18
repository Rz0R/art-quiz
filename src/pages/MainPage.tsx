import React from 'react';
import { Link } from 'react-router-dom';


const MainPage: React.FC = () => {

    return (
        <div>
            <h1>Main page</h1>
            <Link to='/category'>Category</Link>
            <Link to='/settings'>Settings</Link>
        </div>
    );
}

export default MainPage;