import '../pages/index.css';
import initialCards from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function getCard(item, deleteCard, likeCard, openCard) {
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

function createCard(item) {
  const cardElement = getCard(item, deleteCard, likeCard, openCard);
  cardList.append(cardElement);
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteItem = evt.target.closest('.places__item');
  deleteItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(createCard);

// @todo: Функции открытия и закрытия модального окна
function showModal(button, popup) {                     //открытие модального окна
  button.addEventListener('click', (evt) => {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
    });
    window.addEventListener('keydown', closeEscapeModal(popup));
  });
};

function closeModal(button, popup) {                    //закрытие модального окна на крестик
  button.addEventListener('click', (evt) => {
    popup.classList.remove('popup_is-opened');
  });
};

function closeEscapeModal(popup) {                      //закрытие модального окна на Esc
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      window.removeEventListener('keydown', closeEscapeModal(popup));
    };
  });
};

function closeAreaModal(popup) {                        //закрытие модального окна вне его области
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      popup.classList.remove('popup_is-opened');
    };
  });
};

// @todo: Модальное окно редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');

showModal(openEditButton, editPopup);
closeModal(closeEditButton, editPopup);
closeEscapeModal(editPopup);
closeAreaModal(editPopup);

// @todo: Модальное окно добавления карточек
const addPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__close');

showModal(openAddButton, addPopup);
closeModal(closeAddButton, addPopup);
closeEscapeModal(addPopup);
closeAreaModal(addPopup);

// @todo: Модальное окно увеличение картинок
const photoPopup = document.querySelector('.popup_type_image');
const closePhoto = photoPopup.querySelector('.popup__close');

closeModal(closePhoto, photoPopup);
closeEscapeModal(photoPopup);
closeAreaModal(photoPopup);

// @todo: Работа с модальным окном редактирования профиля
const editForm = document.querySelector('form[name="edit-profile"');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');
const saveEditButton = editForm.querySelector('.popup__button');

function saveInfo() {                                    //сохранение данных полей ввода
  nameInput.value = namePlace.textContent;
  jobInput.value = jobPlace.textContent;
  
};

function handleEditForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  namePlace.textContent = nameValue;
  jobPlace.textContent = jobValue;
};

openEditButton.addEventListener('click', saveInfo);
closeEditButton.addEventListener('click', saveInfo);
saveEditButton.addEventListener('click', closeModal(saveEditButton, editPopup));
editForm.addEventListener('submit', handleEditForm);

// @todo: Работа с модальным окном добавления карточек
const addForm = document.querySelector('form[name="new-place"');
const cardInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');
const saveAddButton = addForm.querySelector('.popup__button');

function clearInfo() {                                     //удаление данных полей ввода
  cardInput.value = '';
  linkInput.value = '';
}

function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  const card = { name: cardValue, link: linkValue };
  initialCards.unshift(card);
  const newCard = getCard(card);
  cardList.prepend(newCard);
  clearInfo();
};

saveAddButton.addEventListener('click', closeModal(saveAddButton, addPopup));
addForm.addEventListener('submit', handleAddForm);

function likeCard(evt) {                                     //лайк карточек
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCard(evt) {                                     //открытие карточек
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
