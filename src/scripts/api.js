// Константы для работы с сервером
const baseUrl = 'https://mesto.nomoreparties.co/v1/wff-cohort-1/';
const token = '55f00a7c-9528-4892-9d7b-63d1b17cdab8';
const user = 'users/me';
const card = 'cards';
const likeCard = 'cards/likes/';
const avatar = 'users/me/avatar';
function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}
// Функция загрузки информации о пользователе с сервера
function getUserInfo() {
  const targetUrl = baseUrl + user;
  return fetch(targetUrl, {
  headers: {
    authorization: token
  }
})
  .then((res) => getResponseData(res));
};

// Функция загрузки карточек с сервера
function getCards() {
  const targetUrl = baseUrl + card;
  return fetch(targetUrl, {
  headers: {
    authorization: token
  }
})
  .then((res) => getResponseData(res));
};

// Функция редактирования данных профиля
function editProfile(profileName, profileAbout) {
  const targetUrl = baseUrl + user;
  return fetch(targetUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then((res) => getResponseData(res));
};

// Функция добавления новой карточки на страницу
function addNewCard(nameCard, linkCard) {
  const targetUrl = baseUrl + card;
  return fetch(targetUrl, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
  .then((res) => getResponseData(res));
};

// Функция удаления карточки со страницы
function deleteMyCard(itemId) {
  const targetUrl = baseUrl + card + '/' + itemId;
  return fetch(targetUrl, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
};

// Функция лайка карточки
function likeThisCard(itemId) {
  const targetUrl = baseUrl + likeCard + itemId;
  return fetch(targetUrl, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
};

// Функция дизлайка карточки
function dislikeThisCard(itemId) {
  const targetUrl = baseUrl + likeCard + itemId;
  return fetch(targetUrl, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
};

// Функция смены аватара
function changeAvatar(avatarLink) {
  const targetUrl = baseUrl + avatar;
  return fetch(targetUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then((res) => getResponseData(res));
};

export { getUserInfo, getCards, deleteMyCard, editProfile, addNewCard, likeThisCard, dislikeThisCard, changeAvatar };