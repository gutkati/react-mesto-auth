import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content page__content">

            <section className="profile">
                <div className="profile__container">
                    <div className="profile__container-avatar" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
                    </div>

                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button onClick={onEditProfile} aria-label="редактировать" type="button"
                                    className="profile__edit-button blackout"></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} aria-label="добавить" type="button"
                        className="profile__add-button blackout"></button>
            </section>

            <section className="elements content__elements">
                <ul className="element">
                    {
                        cards.map((card) => (
                            <Card card={card}
                                  key={card._id}
                                  onCardClick={onCardClick}
                                  onCardLike={onCardLike}
                                  onCardDelete={onCardDelete}
                            />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
};

export default Main;