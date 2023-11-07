import '../pages/index.css';
import initialCards from './cards';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function getCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', function() {
    const deleteItem = deleteButton.closest('.card');
    deleteCard(deleteItem);
  });
  return cardElement;
};

function createCard(item) {
  const cardElement = getCard(item);
  cardList.append(cardElement);
};

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(createCard);

// @todo: Функции открытия и удаления модального окна
function showModal(button, popup) {                     //открытие модального окна
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', closeEscapeModal(popup));
  });
};

function closeModal(button, popup) {                    //закрытие модального окна на крестик
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.remove('popup_is-opened');
  });
};

function closeEscapeModal(popup) {                      //закрытие модального окна на Esc
  window.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      window.removeEventListener('keydown', closeEscapeModal(popup));
    }
  });
};

function closeAreaModal(popup) {                        //закрытие модального окна вне его области
  popup.addEventListener('click', (evt) => {
    evt.preventDefault();
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
const openPhoto = document.querySelectorAll('.card__image');
const closePhoto = photoPopup.querySelector('.popup__close');
const card = photoPopup.querySelector('.popup__image')
const caption = photoPopup.querySelector('.popup__caption'); 

openPhoto.forEach((photo) => {
  showModal(photo, photoPopup);
  card.setAttribute('src', photo.src);
  card.setAttribute('alt', photo.alt);
  caption.textContent = photo.alt;
});

closeModal(closePhoto, photoPopup);
closeEscapeModal(photoPopup);
closeAreaModal(photoPopup);

// @todo: Работа с модальным окном редактирования профиля
const editForm = document.querySelector('form[name="edit-profile"');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const namePlace = document.querySelector('.profile__title');
  const jobPlace = document.querySelector('.profile__description');
  namePlace.textContent = nameValue;
  jobPlace.textContent = jobValue;
};

editForm.addEventListener('submit', handleFormSubmit); 

// @todo: Работа с модальным окном добавления карточек




/*
openEditButton.addEventListener('click', (evt) => {      //сохранение данных в форме при открытии
  evt.preventDefault();
  nameInput.placeholder = namePlace.textContent;
  jobInput.placeholder = jobPlace.textContent;
});
*/