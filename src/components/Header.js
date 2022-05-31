import React from 'react';
import HeaderLogo from '../images/logo.svg';

function Header(props) {
    return (
        <header className="header page__header">
            <img src={HeaderLogo} alt="логотип" className="header__logo"/>
            <div className="header__section">
                <p className="header__email">{props.emailUser}</p>
                <button onClick={props.handleClick} className="header__button" type="button">{props.nameButton}</button>
            </div>

        </header>
    )
}

export default Header;

