import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import 'semantic-ui-css/semantic.min.css'

const Header = (props) => {
    console.log("header")
    return (
        <header className="header">
        <FontAwesomeIcon className="Icon" icon={faCloudSunRain} />
          <h1>Sweet sky</h1>
        </header>
    );
};

export default Header;