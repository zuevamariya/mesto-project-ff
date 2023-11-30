// Константы для работы с сервером
const baseUrl = 'https://mesto.nomoreparties.co/v1/wff-cohort-1/';
const token = '55f00a7c-9528-4892-9d7b-63d1b17cdab8';
const user = 'users/me';
const card = 'cards';
const likeCard = 'cards/likes/';
const avatar = 'users/me/avatar';

// Функция загрузки информации о пользователе с сервера
function getUserInfo() {
  const TargetUrl = baseUrl + user;
  return fetch(TargetUrl, {
  headers: {
    authorization: token
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция загрузки карточек с сервера
function getCards() {
  const TargetUrl = baseUrl + card;
  return fetch(TargetUrl, {
  headers: {
    authorization: token
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция редактирования данных профиля
function editProfile(profileName, profileAbout) {
  const TargetUrl = baseUrl + user;
  return fetch(TargetUrl, {
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция добавления новой карточки на страницу
function addNewCard(nameCard, linkCard) {
  const TargetUrl = baseUrl + card;
  return fetch(TargetUrl, {
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция удаления карточки со страницы
function deleteMyCard(itemId) {
  const TargetUrl = baseUrl + card + '/' + itemId;
  return fetch(TargetUrl, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция лайка карточки
function likeThisCard(itemId) {
  const TargetUrl = baseUrl + likeCard + itemId;
  return fetch(TargetUrl, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция дизлайка карточки
function dislikeThisCard(itemId) {
  const TargetUrl = baseUrl + likeCard + itemId;
  return fetch(TargetUrl, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция смены аватара
function changeAvatar(avatarLink) {
  const TargetUrl = baseUrl + avatar;
  return fetch(TargetUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export { getUserInfo, getCards, deleteMyCard, editProfile, addNewCard, likeThisCard, dislikeThisCard, changeAvatar };