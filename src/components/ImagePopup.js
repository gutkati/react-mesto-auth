import React from "react";

export default function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__modal-image">
                <button type="button" aria-label="закрыть"
                        className="popup__close popup__close_type_image blackout" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img src={props.card.link} alt={props.card.name} className="popup__photo"/>
                    <figcaption className="popup__subtitle">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}