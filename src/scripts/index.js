import '../pages/index.css';
import { initialCards, createCard } from './cards';
import { showModal, closeModal, closeEscapeModal, closeAreaModal, saveInfo, handleEditForm, handleAddForm } from './modal';
export { nameInput, jobInput, namePlace, jobPlace, cardInput, linkInput, cardList, cardTemplate };

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
                                   
initialCards.forEach(createCard);                             //создание и вывод карточек на страницу

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

// Работа с модальным окном добавления карточек (DOM-элементы и вызовы)
const addForm = document.querySelector('form[name="new-place"');
const cardInput = addForm.querySelector('.popup__input_type_card-name');
const linkInput = addForm.querySelector('.popup__input_type_url');
const saveAddButton = addForm.querySelector('.popup__button');

saveAddButton.addEventListener('click', closeModal(saveAddButton, addPopup));
addForm.addEventListener('submit', handleAddForm);