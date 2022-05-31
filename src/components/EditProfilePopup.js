import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();            // Запрещаем браузеру переходить по адресу формы

        props.onUpdateUser({          // Передаём значения управляемых компонентов во внешний обработчик
            name: name,
            about: description
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='profile'
                       title='Редактировать профиль' titleButton='Сохранить'>
            <div className="popup__input-container">
                <input value={name || ""} onChange={handleNameChange} type="text" name="name" placeholder="Имя"
                       minLength="2" maxLength="40"
                       required className="popup__input popup__input_theme_name" id="profile-name-input"/>
                <span className="profile-name-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container">
                <input value={description || ""} onChange={handleDescriptionChange} type="text" name="about"
                       placeholder="О себе" minLength="2"
                       maxLength="200" required className="popup__input popup__input_theme_about-me"
                       id="profile-about-me-input"/>
                <span className="profile-about-me-input-error popup__input-error"></span>
            </div>
        </PopupWithForm>
    )
}