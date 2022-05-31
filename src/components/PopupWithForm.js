import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__modal">
                <button onClick={props.onClose} type="button" aria-label="закрыть"
                        className="popup__close blackout"></button>
                <form onSubmit={props.onSubmit} name={props.name}
                      className={`popup__form popup__form_type${props.name}`}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__save">{props.titleButton}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;