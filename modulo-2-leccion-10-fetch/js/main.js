'use strict';

const image = document.querySelector('.js-dog');
function renderHTML(dogData) {
  image.src = dogData.message;
}

fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json() /*recibe la repsuesta en texto y d*/)
  .then((dogData) => {
    console.log(dogData);
    renderHTML(dogData);
  });
