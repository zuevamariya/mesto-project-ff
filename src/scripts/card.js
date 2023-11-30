import { deleteMyCard, likeThisCard, dislikeThisCard } from './api';

// Функция создания карточки
function createCard(item, cardTemplate, deleteCard, likeCard, openCard, openDeletePopup, closeDeletePopup, deletePopup, profileId) {
  // DOM-элементы
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeLabel = cardElement.querySelector('.card__like-label');
  const closeDeleteButton = deletePopup.querySelector('.popup__close');
  const consentDeleteButton = deletePopup.querySelector('.popup__button');

  // Присвоение значений
  const cardId = item._id;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeLabel.textContent = item.likes.length;

  // Обработка клика лайка
  likeButton.addEventListener('click', () => {
    likeCard(likeButton, likeLabel, cardId);
  });

  // Обработка клика по карточке - открытие
  cardImage.addEventListener('click', openCard);

  // Запрет на удаление чужих карточек
  if (item.owner._id !==  profileId) {
    deleteButton.remove();
  };
  
  // Переменная, хранящая функции удаления карточки со страницы
  const set = () => {
    deleteMyCard(cardId)
      .then(() => {
        closeDeletePopup();
        deleteCard(deleteButton);
        consentDeleteButton.removeEventListener('click', set);
      })
      .catch((error) => {
        console.log('Ошибка удаления карточки со страницы:', error);
      })
  };

  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    openDeletePopup();
    consentDeleteButton.addEventListener('click', set);
  });
  closeDeleteButton.addEventListener('click', () => {
    closeDeletePopup();
    consentDeleteButton.removeEventListener('click', set);
  });

  return cardElement;
};

// Функция вставки/добавления карточки
function addCard(item, cardList, cardTemplate, deleteCard, likeCard, openCard, openDeletePopup, closeDeletePopup, deletePopup, profileId) {
  const cardElement = createCard(item, cardTemplate, deleteCard, likeCard, openCard, openDeletePopup, closeDeletePopup, deletePopup, profileId);
  cardList.append(cardElement);
};

// Функция удаления карточки
function deleteCard(deleteButton) {
  const deleteItem = deleteButton.closest('.places__item');
  deleteItem.remove();
};

// Функция лайка карточки
function likeCard(likeButton, likeLabel, cardId) {
  likeButton.classList.toggle('card__like-button_is-active');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeThisCard(cardId)
      .then((obj) => {
        likeLabel.textContent = obj.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка при постановке лайка', error);
      });
  } else {
    dislikeThisCard(cardId)
      .then((obj) => {
        likeLabel.textContent = obj.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка при удалении лайка', error);
      });
  };
};

export { addCard, createCard, deleteCard, likeCard };