import { likeThisCard, dislikeThisCard } from './api';

// Функция создания карточки
function createCard(item, cardTemplate, likeCard, openCard, openDeletePopup, deleteThisCard, profileId) {
  // DOM-элементы
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeLabel = cardElement.querySelector('.card__like-label');
  
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
  
  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    openDeletePopup();
    deleteThisCard(cardId, deleteButton);
  });

  return cardElement;
};

// Функция вставки/добавления карточки
function addCard(item, cardList, cardTemplate, likeCard, openCard, openDeletePopup, deleteThisCard, profileId) {
  const cardElement = createCard(item, cardTemplate, likeCard, openCard, openDeletePopup, deleteThisCard, profileId);
  cardList.append(cardElement);
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

export { addCard, createCard, likeCard };