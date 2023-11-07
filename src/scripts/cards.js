import { cardList, cardTemplate, openCard } from "./index";

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

// Функция создания карточки
function createCard(item, deleteCard, likeCard, openCard) {
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

// Функция вставки/добавления карточки
function addCard(item) {
  const cardElement = createCard(item, deleteCard, likeCard, openCard);
  cardList.append(cardElement);
};

// Функция удаления карточки
function deleteCard(evt) {
  const deleteItem = evt.target.closest('.places__item');
  deleteItem.remove();
};

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { initialCards, addCard, createCard, deleteCard, likeCard };