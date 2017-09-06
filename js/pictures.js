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
var resizeControlValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var resizeButtonMin = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeButtonMax = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var effectImagePreview = document.querySelector('.effect-image-preview');
resizeControlValue.setAttribute('value', '100%');
var resizeValue = parseInt(resizeControlValue.value, 10);

// Клики на кнопки
var resizeToMin = function () {
  if ((resizeValue - resizeStep) > resizeMin) {
    resizeValue = resizeValue - resizeStep;
  } else {
    resizeValue = resizeMin;
  }

  resizeControlValue.setAttribute('value', resizeValue + '%');
  effectImagePreview.setAttribute('style', ('transform: scale(' + (resizeValue / 100) + ')'));
};

var resizeToMax = function () {
  if ((resizeValue + resizeStep) <= resizeMax) {
    resizeValue = resizeValue + resizeStep;
  } else {
    resizeValue = resizeMax;
  }

  resizeControlValue.setAttribute('value', resizeValue + '%');
  effectImagePreview.setAttribute('style', ('transform: scale(' + (resizeValue / 100) + ')'));
};

resizeButtonMin.addEventListener('click', resizeToMin);
resizeButtonMax.addEventListener('click', resizeToMax);


// ФИЛЬТРЫ
var effectControlsBlock = document.querySelector('.upload-effect-controls'); // Блок всех фильтров
var uploadEffectPreview = document.querySelector('.upload-effect-preview'); // Блок с превью фильтра

uploadEffectPreview.setAttribute('tabIndex', '0');

effectControlsBlock.onclick = function (event) {
  var target = event.target;
  if (target.tagName !== uploadEffectPreview) {
    return;
  }
  target = target.value;
};

effectControlsBlock.addEventListener('click', function (event) {
  effectImagePreview.classList.add('effect-' + event.target.value);
});

// Хэш-теги
/*
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');

uploadFormHashtags = {};
var uploadFormHashtagsLength = 5;


for (i = 0; i < uploadFormHashtagsLength; i++) {

}*/

