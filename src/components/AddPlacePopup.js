import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

    const [cardName, setCardName] = useState("");
    const [cardLink, setCardLink] = useState("");

    function handleCardName(e) {
        setCardName(e.target.value);
    }

    function handleCardLink(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();            // Запрещаем браузеру переходить по адресу формы
        props.onAddPlace({          // Передаём значения управляемых компонентов во внешний обработчик
            name: cardName,
            link: cardLink
        });
    }

    useEffect(() => {
        setCardName("");
        setCardLink("");
    }, [props.isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='card'
                       title='Новое место' titleButton='Создать'>
            <div className="popup__input-container">
                <input value={cardName} onChange={handleCardName} type="text" name="name" placeholder="Название"
                       minLength="2"
                       maxLength="30" required className="popup__input popup__input_type_card-name"
                       id="card-name-input"/>
                <span className="card-name-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container">
                <input value={cardLink} onChange={handleCardLink} type="url" name="link"
                       placeholder="Ссылка на картинку" required
                       className="popup__input popup__input_type_card-link" id="card-link-input"/>
                <span className="card-link-input-error popup__input-error"></span>
            </div>
        </PopupWithForm>
    )
}