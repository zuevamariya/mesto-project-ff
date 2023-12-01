import '../pages/index.css';
import { createCard, likeCard } from './card';
import { showModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, deleteMyCard, editProfile, addNewCard, changeAvatar } from './api';

// Объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM-элементы для создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Функция вставки/добавления карточки
function addCard(item, cardList, cardTemplate, createCard, likeCard, openCard, deleteThisCard, profileId) {
  const cardElement = createCard(item, cardTemplate, likeCard, openCard, deleteThisCard, profileId);
  cardList.append(cardElement);
};

// Функция заполнения карточками страницы
function fillCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    addCard(card, cardList, cardTemplate,createCard, likeCard, openCard, deleteThisCard, profileId);
  });
};

// Модальное окно редактирования профиля (DOM-элементы и вызовы)
const editPopup = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = editPopup.querySelector('.popup__close');
const editForm = document.querySelector('form[name="edit-profile"');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');
const editSaveButton = editPopup.querySelector('.popup__button');

openEditButton.addEventListener('click', () => {
  showModal(editPopup);
  fillPopupEditInputs();
  clearValidation(editForm, validationConfig);
});

closeEditButton.addEventListener('click', () => {
  closeModal(editPopup);
});

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
  editSaveButton.textContent = 'Сохранение...';
  editSaveButton.disabled = true;
  editProfile(nameValue, jobValue)
    .then((res) => {
      console.log('Редактирование данных профиля прошло успешно =>','\n',
      'Имя:', res.name, '\n', 'Занятие:', res.about);
      namePlace.textContent = res.name;
      jobPlace.textContent = res.about;
      closeModal(editPopup);
    })
    .catch((error) => {
      console.log('Ошибка при редактировании данных профиля:', error);
    })
    .finally(() => {
      editSaveButton.textContent = 'Сохранить';
      editSaveButton.disabled = false;
    });
};

editForm.addEventListener('submit', handleEditForm);

// Модальное окно добавления карточек (DOM-элементы и вызовы)
const addPopup = document.querySelector('.popup_type_new-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = addPopup.querySelector('.popup__close');
const addForm = document.querySelector('form[name="new-place"');
const cardInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');
const addSaveButton = addPopup.querySelector('.popup__button');

openAddButton.addEventListener('click', () => {
  showModal(addPopup);
});

closeAddButton.addEventListener('click', () => {
  closeModal(addPopup);
});

// Функция добавления карточек на страницу
function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  addSaveButton.textContent = 'Сохранение...';
  addSaveButton.disabled = true;
  addNewCard(cardValue, linkValue)
    .then((card) => {
      console.log('Добавление карточки прошло успешно:', card.link);
      const newCard = createCard(card, cardTemplate, likeCard, openCard, deleteThisCard, profileId);
      cardList.prepend(newCard);
      closeModal(addPopup);
    })
    .catch((error) => {
      console.log('Ошибка при добавлении карточки на страницу:', error);
    })
    .finally(() => {
      addForm.reset();
      clearValidation(addForm, validationConfig);
      addSaveButton.textContent = 'Сохранить';
      addSaveButton.disabled = false;
    });
};

addForm.addEventListener('submit', handleAddForm);

// Модальное окно увеличение картинок (DOM-элементы и вызовы)
const photoPopup = document.querySelector('.popup_type_image');
const closePhotoButton = photoPopup.querySelector('.popup__close');
const largePhotoCard = photoPopup.querySelector('.popup__image');
const photoCaption = photoPopup.querySelector('.popup__caption');

closePhotoButton.addEventListener('click', () => {
  closeModal(photoPopup);
});

// Функция открытия карточек с подписью
function openCard(evt) {
  showModal(photoPopup);
  largePhotoCard.setAttribute('src', evt.target.src);
  largePhotoCard.setAttribute('alt', evt.target.alt);
  photoCaption.textContent = evt.target.alt;
};

// Модальное окно редактирования аватара (DOM-элементы и вызовы)
const profileImage = document.querySelector('.profile__image');
const profilePopup = document.querySelector('.popup_type_change-avatar');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const profileForm = document.querySelector('form[name="new-avatar"');
const profileLinkInput = profileForm.querySelector('.popup__input_type_url');
const profileSaveButton = profilePopup.querySelector('.popup__button');

profileImage.addEventListener('click', () => {
  showModal(profilePopup);
});

closeProfileButton.addEventListener('click', () => {
  closeModal(profilePopup);
});

// Функция смены аватара
function handleProfileForm(evt) {
  evt.preventDefault();
  const linkValue = profileLinkInput.value;
  profileImage.style.backgroundImage = linkValue;
  profileSaveButton.textContent = 'Сохранение...';
  profileSaveButton.disabled = true;
  changeAvatar(linkValue)
    .then((res) => {
      console.log('Обновление аватара произошло успешно:', `url('${res.avatar}')`);
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      profileForm.reset();
      clearValidation(profileForm, validationConfig);
      profileSaveButton.textContent = 'Сохранить';
      profileSaveButton.disabled = false;
    });
};

profileForm.addEventListener('submit', handleProfileForm);

// Функция удаления карточки
function deleteThisCard(cardId, deleteButton) {
  deleteMyCard(cardId)
    .then((res) => {
      console.log('Удаление карточки произошло успешно:', res);
      const deleteItem = deleteButton.closest('.places__item');
      deleteItem.remove();
    })
    .catch((error) => {
      console.log('Ошибка при удалении карточки:', error);
    });
};

// Вызов функции, отвечающей за включение валидации всех форм
enableValidation(validationConfig);

let profileId;

// Вывод объекта с данными профиля и массива с карточками
Promise.all([getUserInfo(), getCards()])
  .then((array) => {
    const userList = array[0];
    const initialCards = array[1];
    console.log('Оба запроса на сервер выполнены успешно =>',
    '\n', 'Данные профиля:', userList, '\n', 'Массив с карточками:', initialCards);
    namePlace.textContent = userList.name;
    jobPlace.textContent = userList.about;
    profileId = userList._id
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, profileId);
  })
  .catch((error) => {
    console.log('Ошибка при выполнении запросов на сервер:', error);
  });