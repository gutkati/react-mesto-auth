import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete blackout ${isOwn ? "" : "element__delete_hidden"}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? "element__like-active" : ""}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element__item" key={props.card._id}>
            <button onClick={handleDeleteCard} aria-label="удалить" type="button"
                    className={cardDeleteButtonClassName}></button>
            <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image"/>
            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__section-like">
                    <button onClick={handleLikeClick} aria-label="нравится" type="button"
                            className={cardLikeButtonClassName}></button>
                    <span className="element__like-number">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}