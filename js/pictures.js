'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var galleryOverlayShow = function (number) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', parameterObjects[number].url.toString());
  galleryOverlay.querySelector('.likes-count').textContent = parameterObjects[number].likes;
  galleryOverlay.querySelector('.comments-count').textContent = parameterObjects[number].comments;
};

// Пользовательский интерфейс
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

var setListener = function (index) {
  picture[index].addEventListener('click', function (evt) {
    galleryOverlayShow(index);
    onPictureClick(evt);
  });
};

for (var index = 0; index < picture.length; index++) {
  setListener(index);
}

// ВАЛИДАЦИЯ ФОРМЫ

var uploadFormImage = document.querySelector('.upload-image'); // Блок загрузки
var uploadFile = document.getElementById('upload-file'); // Input загрузки  файлов
var uploadOverlay = document.querySelector('.upload-overlay'); // Окно изменений
var uploadFormCancel = document.getElementById('upload-cancel'); // Кнопка закрытия окна изменений
var userCommentForm = document.querySelector('.upload-form-description');
var resizeControlValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var resizeButtonMin = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeButtonMax = uploadOverlay.querySelector('.upload-resize-controls-button-inc');


// Функции
var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  uploadFormImage.classList.add('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  uploadFormImage.classList.remove('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
};

// Обработчики
var onUploadOverlayEscPress = function (evt) {
  if (document.activeElement !== userCommentForm && evt.keyCode === ESC_KEYCODE) {
    closeUploadOverlay();
  }
};

// Cобытия
uploadFile.addEventListener('change', openUploadOverlay);
uploadFormCancel.addEventListener('click', closeUploadOverlay);

// Функция изменения размера фотографии
var resizeMin = 25;
var resizeMax = 100;
var resizeStep = 25;
var resizeValue = resizeControlValue.getAttribute('value');

var resizeToMin = function () {
  resizeValue = parseFloat(resizeValue);
  var resizeNewValue = resizeValue - resizeStep;
  return resizeNewValue + '%';
};

var resizeToMax = function () {
  resizeValue = parseFloat(resizeValue);
  var resizeNewValue = resizeValue + resizeStep;
  return resizeNewValue + '%';
};

var onButtonMinPress = function () {
  if (resizeValue > resizeMin) {
    resizeToMin();
  }
};

var onButtonMaxPress = function () {
  if (resizeValue < resizeMax) {
    resizeToMax();
  }
};

resizeButtonMin.addEventListener('click', onButtonMinPress);
resizeButtonMax.addEventListener('click', onButtonMaxPress);

// ФИЛЬТРЫ

var effectImagePreview = document.querySelector('.effect-image-preview');
var effectControlsBlock = document.querySelector('.upload-effect-controls'); // Блок всех фильтров
var uploadEffectButton = effectControlsBlock.getElementsByTagName('input');

var getValueInput = function (event) {
  var target = event.target;
  if (target === uploadEffectButton) {
    var valueInput = uploadEffectButton.getAttribute('value');
  }
  return valueInput;
};

for (i = 0; i < uploadEffectButton.length; i++) {
  uploadEffectButton[i].addEventListener('click', function () {
    effectImagePreview.classList.add('effect-' + getValueInput());
  });
}


