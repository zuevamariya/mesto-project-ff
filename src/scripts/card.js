import { likeThisCard, dislikeThisCard } from './api';

// Функция создания карточки
function createCard(item, cardTemplate, likeCard, openCard, deleteThisCard, profileId) {
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
  
  // Обработка клика удаления карточки
  deleteButton.addEventListener('click', () => {
    deleteThisCard(cardId, deleteButton);
  });

  return cardElement;
};

// Функция лайка карточки
function likeCard(likeButton, likeLabel, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeThisCard(cardId)
      .then((obj) => {
        console.log('Лайк с карточки убран:', obj);
        likeButton.classList.remove('card__like-button_is-active');
        likeLabel.textContent = obj.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка при удалении лайка', error);
      });
  } else {
    likeThisCard(cardId)
      .then((obj) => {
        console.log('Лайк на карточку поставлен:', obj);
        likeButton.classList.add('card__like-button_is-active');
        likeLabel.textContent = obj.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка при постановке лайка', error);
      });
  };
};

export { createCard, likeCard };