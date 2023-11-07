export { showModal, closeModal, closeEscapeModal, closeAreaModal, saveInfo, handleEditForm, handleAddForm };
import { nameInput, jobInput, namePlace, jobPlace, cardInput, linkInput, cardList } from './index';
import { initialCards, getCard, deleteCard, likeCard, openCard } from './cards';

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

function saveInfo() {                                    //сохранение данных полей ввода формы
  nameInput.value = namePlace.textContent;
  jobInput.value = jobPlace.textContent;
  
};

function handleEditForm(evt) {                           //редактирование данных профиля
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  namePlace.textContent = nameValue;
  jobPlace.textContent = jobValue;
};

function clearInfo() {                                   //удаление данных полей ввода формы
  cardInput.value = '';
  linkInput.value = '';
}

function handleAddForm(evt) {                            //редактирование данных карточек
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  const card = { name: cardValue, link: linkValue };
  initialCards.unshift(card);
  const newCard = getCard(card, deleteCard, likeCard, openCard);
  cardList.prepend(newCard);
  clearInfo();
};
