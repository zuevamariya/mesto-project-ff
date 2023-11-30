import '../pages/index.css';
import { addCard, createCard, deleteCard, likeCard } from './card';
import { showModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, editProfile, addNewCard, changeAvatar } from './api';

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

// Функция заполнения карточками страницы
function fillCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    addCard(card, cardList, cardTemplate, deleteCard, likeCard, openCard, profileId);
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
  editProfile(nameValue, jobValue)
    .then((res) => {
      namePlace.textContent = res.name;
      jobPlace.textContent = res.about;
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(()=> {
    closeModal(editPopup);
    editSaveButton.textContent = 'Сохранить';
  }, 1000);
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
  addNewCard(cardValue, linkValue)
    .then((card) => {
    const newCard = createCard(card, cardTemplate, deleteCard, likeCard, openCard, profileId);
    cardList.prepend(newCard);
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(()=> {
    addForm.reset();
    closeModal(addPopup);
    clearValidation(addForm, validationConfig);
    addSaveButton.textContent = 'Сохранить';
  }, 1000);
};

addForm.addEventListener('submit', handleAddForm);

// Модальное окно увеличение картинок (DOM-элементы и вызовы)
const photoPopup = document.querySelector('.popup_type_image');
const closePhoto = photoPopup.querySelector('.popup__close');

closePhoto.addEventListener('click', () => {
  closeModal(photoPopup);
});

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
  changeAvatar(linkValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(()=> {
    profileForm.reset();
    closeModal(profilePopup);
    clearValidation(profileForm, validationConfig);
    profileSaveButton.textContent = 'Сохранить';
  }, 1000);
};

profileForm.addEventListener('submit', handleProfileForm);

// Вызов функции, отвечающей за включение валидации всех форм
enableValidation(validationConfig);

let profileId;

// Вывод объекта с данными профиля и массива с карточками
Promise.all([getUserInfo(), getCards()])
  .then((array) => {
    const userList = array[0];
    const initialCards = array[1];
    namePlace.textContent = userList.name;
    jobPlace.textContent = userList.about;

    profileId = userList._id
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, profileId);
  })
  .catch((error) => {
    console.log(error);
  });