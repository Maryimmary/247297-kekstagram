'use strict';

// Cлучайное число лайков
var randomlikeNumbers = function () {
  var likeNumbers = [];
  var likeNumbersCount = 200;
  for (var i = 15; i <= likeNumbersCount; i++) {
    likeNumbers.push(i);
  }
  return likeNumbers[Math.floor(Math.random() * likeNumbers.length)];
};

// Комментарии
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

// Массив из 25 объектов
var parameterAllFunction = function () {
  var parameterAll = [];
  var parameterAllObjects = 25;
  for (var i = 1; i <= parameterAllObjects; i++) {
    param = {
      url: 'photos/' + i + '.jpg',
      likes: randomlikeNumbers(),
      comments: randomComment()
    };
    parameterAll.push(param);
  }
  return parameterAll;
};

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesField = document.querySelector('.pictures');

var pictureAdd = function() {
  var pictureContent = pictureTemplate.cloneNode(true);
  pictureContent.querySelector('img').getAttribute('src').textContent = parameterAll[param].url;
  pictureContent.querySelector('.picture-likes').textContent = parameterAll[param].likes;
  pictureContent.querySelector('.picture-comments').textContent = parameterAll[param].comments;
  return pictureContent;
}

var fragment = document.createDocumentFragment();
for (var i = 1; i <= parameterAll.length; i++) {
  fragment.appendChild(pictureAdd(parameterAll[i]));
}
picturesField.appendChild(fragment);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.remove('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

galleryOverlay.querySelector('.gallery-overlay-image').getAttribute('src').textContent = parameterAll[1].url;
galleryOverlay.querySelector('.likes-count').textContent = parameterAll[1].likes;
galleryOverlay.querySelector('.comments-count').textContent = parameterAll[1].comments;
