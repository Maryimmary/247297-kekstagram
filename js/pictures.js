//Массив номеров 1-25

var randomPhotoNumbers = function () {
  var photoNumbers = [];
  var photoNumbersSize = 25;
  for (var i = 1; i <= photoNumbersSize; i++) {
    photoNumbers.push(i);
  }
  return photoNumbers[i];
};

//Cлучайное число лайков

var randomlikeNumbers = function () {
  var likeNumbers = [];
  var likeNumbersCount = 200;
  for (var i = 15; i <= likeNumbersCount; i++) {
    likeNumbers.push(i);
  }
  return likeNumbers[Math.floor(Math.random() * likeNumbers.length)];
};

//Комментарии

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

//Массив из 25 объектов
var parameterAll = [
  {
    url: 'photos/{{randomPhotoNumbers().toString()}}.jpg',
    likes: randomlikeNumbers(),
    comments: randomComment().toString()
  }
];
console.log(parameterAll);
