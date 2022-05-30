export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }

];

export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const popupButtonOpen = document.querySelector('.profile__edit-button');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar') ;

export const inputName = document.querySelector('.popup__input_theme_name');
export const inputAboutMe = document.querySelector('.popup__input_theme_about-me');

export const elementCard = document.querySelector('.element');  //вставлять новую разметку в код

export const popupTypeImage = document.querySelector('.popup_type_image');

export const profileAddButton = document.querySelector('.profile__add-button');

export const popupTypeCard = document.querySelector('.popup_type_card');

export const formTypeCard = document.querySelector('.popup__form_type_card');
export const formTypeProfile = document.querySelector('.popup__form_type_profile');
export const formTypeAvatar = document.querySelector('.popup__form_type_profile-avatar');

export const config = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
};

export const buttonNewAvatar = document.querySelector('.profile__container-avatar');
export const popupTypeProfileAvatar = document.querySelector('.popup_type_profile-avatar');

export const popupTypeRemoveCard = document.querySelector('.popup_type_remove-card');
