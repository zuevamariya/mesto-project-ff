export { cardList, cardTemplate, openCard };
import '../pages/index.css';
import { initialCards, createCard, getCard, deleteCard, likeCard } from './cards';
import { showModal, closeModal, closeEscapeModal, closeAreaModal } from './modal';

// DOM-элементы для создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Перебор элементов массива для создания карточки и ее вывода на страницу
initialCards.forEach(createCard);

// Модальное окно редактирования профиля (DOM-элементы и вызовы)
const editPopup = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');

showModal(openEditButton, editPopup);
closeModal(closeEditButton, editPopup);
closeEscapeModal(editPopup);
closeAreaModal(editPopup);

// Модальное окно добавления карточек (DOM-элементы и вызовы)
const addPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__close');

showModal(openAddButton, addPopup);
closeModal(closeAddButton, addPopup);
closeEscapeModal(addPopup);
closeAreaModal(addPopup);

// Модальное окно увеличение картинок (DOM-элементы и вызовы)
const photoPopup = document.querySelector('.popup_type_image');
const closePhoto = photoPopup.querySelector('.popup__close');

closeModal(closePhoto, photoPopup);
closeEscapeModal(photoPopup);
closeAreaModal(photoPopup);

// Работа с модальным окном редактирования профиля (DOM-элементы и вызовы)
const editForm = document.querySelector('form[name="edit-profile"');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');
const saveEditButton = editForm.querySelector('.popup__button');

openEditButton.addEventListener('click', saveInfo);
closeEditButton.addEventListener('click', saveInfo);
saveEditButton.addEventListener('click', closeModal(saveEditButton, editPopup));
editForm.addEventListener('submit', handleEditForm);

// Функция сохранения данных полей ввода формы
function saveInfo() {
  nameInput.value = namePlace.textContent;
  jobInput.value = jobPlace.textContent;
};

// Функция редактирования данных профиля
function handleEditForm(evt) {
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  namePlace.textContent = nameValue;
  jobPlace.textContent = jobValue;
};

// Работа с модальным окном добавления карточек (DOM-элементы и вызовы)
const addForm = document.querySelector('form[name="new-place"');
const cardInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');
const saveAddButton = addForm.querySelector('.popup__button');

saveAddButton.addEventListener('click', closeModal(saveAddButton, addPopup));
addForm.addEventListener('submit', handleAddForm);

// Функция очистки данных полей ввода формы
function clearInfo() {
  cardInput.value = '';
  linkInput.value = '';
};

// Функция редактирования данных карточек
function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  const card = { name: cardValue, link: linkValue };
  initialCards.unshift(card);
  const newCard = getCard(card, deleteCard, likeCard, openCard);
  cardList.prepend(newCard);
  clearInfo();
};

// Функция открытия карточек с подписью
function openCard(evt) {
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