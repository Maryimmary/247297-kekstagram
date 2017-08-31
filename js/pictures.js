'use strict';

var randomLikeNumbers = function (min, max) {
  var randomLike = min - 0.5 + Math.random() * (max - min + 1);
  randomLike = Math.round(randomLike);
  return randomLike;
};

var randomComment = function () {
  var commentAll = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return commentAll[Math.floor(Math.random() * commentAll.length)];
};

var parameterObjects = [];
var parameterObjectsCount = 25;

var dataPush = function () {
  for (var i = 0; i < parameterObjectsCount; i++) {
    parameterObjects[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomLikeNumbers(15, 200),
      comments: randomComment()
    };
  }
};

dataPush();

var picturesField = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var pictureAddToGallery = function () {
  var pictureContent = pictureTemplate.cloneNode(true);
  pictureContent.querySelector('img').setAttribute('src', parameterObjects[i].url.toString());
  pictureContent.querySelector('.picture-likes').textContent = parameterObjects[i].likes;
  pictureContent.querySelector('.picture-comments').textContent = parameterObjects[i].comments;
  return pictureContent;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < parameterObjects.length; i++) {
  fragment.appendChild(pictureAddToGallery(parameterObjects[i]));
}
picturesField.appendChild(fragment);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var galleryOverlayShow = function (number) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', parameterObjects[number].url.toString());
  galleryOverlay.querySelector('.likes-count').textContent = parameterObjects[number].likes;
  galleryOverlay.querySelector('.comments-count').textContent = parameterObjects[number].comments;
  return galleryOverlay;
};

// Пользовательский интерфейс
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var picture = document.querySelectorAll('.picture');

// Функции
var openOverlay = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
};

var closeOverlay = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onOverlayEscPress);
};

// Обработчики
var onPictureClick = function (evt) {
  evt.preventDefault();
  openOverlay();
};

var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var onCloseButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
};

// События
galleryOverlayClose.addEventListener('click', closeOverlay);
galleryOverlayClose.addEventListener('keydown', onCloseButtonEnterPress);

var setListener = function () {
  picture[i].addEventListener('click', function () {
    galleryOverlayShow(i);
    onPictureClick();
  });
};

for (i = 0; i < picture.length; i++) {
  setListener(i);
}
