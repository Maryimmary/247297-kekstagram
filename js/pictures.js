'use strict';
var randomLikeNumbers = function (min, max) {
  var randomLike = min - 0.5 + Math.random() * (max - min + 1);
  randomLike = Math.round(randomLike);
  return randomLike
};
randomLikeNumbers(15, 200);

var randomComment = function () {
  var commentAll = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return commentAll[Math.floor(Math.random() * commentAll.length)]
};

var parameterObjects = [];
var parameterObjectsCount = 25;
var param;

var parameterCallFunction = function () {
  for (var i = 1; i <= parameterObjectsCount; i++) {
    param = {
      url: 'photos/' + i + '.jpg',
      likes: randomLikeNumbers(15, 200),
      comments: randomComment()
    };
    parameterObjects.push(param)
  }
  return parameterObjects
};

var photosData = parameterCallFunction();


var pictureTemplate = document.querySelector('#picture-template').content;
var picturesField = document.querySelector('.pictures');


var pictureAdd = function (objectNumber) {
  var pictureContent = pictureTemplate.cloneNode(true);
  pictureContent.querySelector('img').setAttribute('src', 'url: parameterObjects[objectNumber.url]');
  pictureContent.querySelector('.picture-likes').textContent = parameterObjects[objectNumber.likes];
  pictureContent.querySelector('.picture-comments').textContent = parameterObjects[objectNumber.comments];
  objectNumber = param;
  return pictureContent
};

pictureAdd();

var fragment = document.createDocumentFragment(parameterObjects[i]);
for (var i = 1; i <= parameterObjects.length; i++) {
  fragment.appendChild(pictureAdd(parameterObjects[i]));
}
picturesField.appendChild(fragment);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.remove('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var galleryOverlayShow = function (number) {
  var galleryOverlay = pictureTemplate.cloneNode(true);
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', 'url: parameterObjects[number.url]');
  galleryOverlay.querySelector('.likes-count').textContent = parameterObjects[number].likes;
  galleryOverlay.querySelector('.comments-count').textContent = parameterObjects[number].comments;
  return galleryOverlay
};

galleryOverlayShow(1);

