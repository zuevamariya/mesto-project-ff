// Функция открытия модального окна
function showModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  });
  document.addEventListener('keydown', closeEscapeModal);
  popup.addEventListener('click', closeOverlayModal);
};

// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscapeModal);
  popup.removeEventListener('click', closeOverlayModal);
};

// Функция закрытия модального окна на Esc
function closeEscapeModal(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

// Функция закрытия модального окна на Overlay
function closeOverlayModal(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};

export { showModal, closeModal };