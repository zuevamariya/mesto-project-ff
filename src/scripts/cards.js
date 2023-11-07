export {initialCards, getCard, createCard, deleteCard, likeCard, openCard };
import { cardList, cardTemplate } from "./index";
import { closeEscapeModal } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function getCard(item, deleteCard, likeCard, openCard) {                   //получение карточки с данными
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openCard);
  return cardElement;
};

function createCard(item) {                                                 //создание карточки
  const cardElement = getCard(item, deleteCard, likeCard, openCard);
  cardList.append(cardElement);
};

function deleteCard(evt) {                                                  //удаление карточки
  const deleteItem = evt.target.closest('.places__item');
  deleteItem.remove();
};

function likeCard(evt) {                                                     //лайк карточек
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCard(evt) {                                                      //открытие карточек
  const photoPopup = document.querySelector('.popup_type_image');
  const card = photoPopup.querySelector('.popup__image');
  const caption = photoPopup.querySelector('.popup__caption');
  photoPopup.classList.add('popup_is-animated');
  setTimeout(() => {
    photoPopup.classList.add('popup_is-opened');
  });
  card.setAttribute('src', evt.target.src);
  card.setAttribute('alt', evt.target.alt);
  caption.textContent = evt.target.alt;
  window.addEventListener('keydown', closeEscapeModal(photoPopup));
};