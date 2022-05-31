import React from "react";
import imageYes from "../images/yes.svg"
import imagesNo from "../images/no.svg"

export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__modal">
                <button onClick={props.onClose} type="button" aria-label="закрыть"
                        className="popup__close blackout"></button>
                <img className="popup__tooltip-img"
                     src={props.symbol ? imageYes : imagesNo}
                     alt={props.symbol ? "Да" : "Нет"}
                />
                <p className="popup__message">{props.message}</p>
            </div>
        </div>
    )
}