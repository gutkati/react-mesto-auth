import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useRef} from "react";

export default function EditAvatarPopup(props) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();            // Запрещаем браузеру переходить по адресу формы

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='profile-avatar'
                       title='Обновить аватар' titleButton='Сохранить'>
            <div className="popup__input-container">
                <input ref={avatarRef} type="url" name="avatar" placeholder="Ссылка на аватар" required
                       className="popup__input popup__input_theme_name" id="avatar-link-input"/>
                <span className="avatar-link-input-error popup__input-error"></span>
            </div>
        </PopupWithForm>
    )
}