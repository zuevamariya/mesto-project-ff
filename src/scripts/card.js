// Функция создания карточки
function createCard(item, cardTemplate, deleteCard, likeCard, openCard) {
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
function addCard(item, cardList, cardTemplate, openCard) {
  const cardElement = createCard(item, cardTemplate, deleteCard, likeCard, openCard);
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

export { addCard, createCard, deleteCard, likeCard };