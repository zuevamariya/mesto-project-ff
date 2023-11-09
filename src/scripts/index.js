import '../pages/index.css';
import { initialCards } from './cards';
import { addCard, createCard, deleteCard, likeCard } from './card';
import { showModal, closeModal } from './modal';

// DOM-элементы для создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Перебор элементов массива для создания карточки и ее вывода на страницу
initialCards.forEach((card) => {
  addCard(card, cardList, cardTemplate, openCard);
});

// Модальное окно редактирования профиля (DOM-элементы и вызовы)
const editPopup = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');

openEditButton.addEventListener('click', () => {
  showModal(editPopup);
  fillPopupEditInputs();
});
closeEditButton.addEventListener('click', () => {
  closeModal(editPopup);
});

// Модальное окно добавления карточек (DOM-элементы и вызовы)
const addPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__close');

openAddButton.addEventListener('click', () => {
  showModal(addPopup);
});
closeAddButton.addEventListener('click', () => {
  closeModal(addPopup);
});

// Модальное окно увеличение картинок (DOM-элементы и вызовы)
const photoPopup = document.querySelector('.popup_type_image');
const closePhoto = photoPopup.querySelector('.popup__close');

closePhoto.addEventListener('click', () => {
  closeModal(photoPopup);
});

// Работа с модальным окном редактирования профиля (DOM-элементы и вызовы)
const editForm = document.querySelector('form[name="edit-profile"');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');

// Функция сохранения данных полей ввода формы
function fillPopupEditInputs() {
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
  closeModal(editPopup);
};

editForm.addEventListener('submit', handleEditForm);

// Работа с модальным окном добавления карточек (DOM-элементы и вызовы)
const addForm = document.querySelector('form[name="new-place"');
const cardInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');

// Функция редактирования данных карточек
function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  const card = { name: cardValue, link: linkValue };
  const newCard = createCard(card, cardTemplate, deleteCard, likeCard, openCard);
  cardList.prepend(newCard);
  addForm.reset();
  closeModal(addPopup);
};

addForm.addEventListener('submit', handleAddForm);

// Функция открытия карточек с подписью
function openCard(evt) {
  const photoPopup = document.querySelector('.popup_type_image');
  const card = photoPopup.querySelector('.popup__image');
  const caption = photoPopup.querySelector('.popup__caption');
  showModal(photoPopup);
  card.setAttribute('src', evt.target.src);
  card.setAttribute('alt', evt.target.alt);
  caption.textContent = evt.target.alt;
};