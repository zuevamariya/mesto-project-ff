export { showModal, closeModal, closeEscapeModal, closeAreaModal };

// Функция открытия модального окна
function showModal(button, popup) {
  button.addEventListener('click', (evt) => {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
    });
    document.addEventListener('keydown', closeEscapeModal(popup));
  });
};

// Функция закрытия модального окна на крестик
function closeModal(button, popup) {
  button.addEventListener('click', (evt) => {
    popup.classList.remove('popup_is-opened');
  });
};

// Функция закрытия модального окна на Esc
function closeEscapeModal(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closeEscapeModal(popup));
    };
  });
};

// Функция закрытия модального окна вне его области
function closeAreaModal(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      popup.classList.remove('popup_is-opened');
    };
  });
};