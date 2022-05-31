import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(password, email);          //вы усрешно зарегестрировались
    };

    return (
        <div>
            <div className='popup__modal popup__modal_theme_black'>
                <h2 className="popup__title">Регистрация</h2>

                <form onSubmit={handleSubmit} className="popup__form">
                    <div className="popup__input-container">
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            className="popup__input popup__input_theme_black popup__input_type_email"
                            type="email"
                            name="email"
                            id="email-input"
                            placeholder="Email"
                            minLength="2"
                            maxLength="100"
                            required
                        />
                        <span className="card-name-input-error popup__input-error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            className="popup__input popup__input_theme_black popup__input_type_password"
                            type="password"
                            name="password"
                            id="password-input"
                            placeholder="Пароль"
                            minLength="4"
                            maxLength="50"
                            required
                        />
                        <span className="card-link-input-error popup__input-error"></span>
                    </div>
                    <button className="popup__save popup__save_theme_black" type="submit">Зарегистрироваться</button>
                    <Link className="popup__redirect" to="/signin">Уже зарегестрированы? Войти</Link>
                </form>

            </div>
        </div>
    )
}