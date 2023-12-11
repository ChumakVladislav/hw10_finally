import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
// import 'https://unpkg.com/slim-select@latest/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_X6XMJZdWVTAdUS61jT0rlHA51VpO6V6AtMugMZfUUgb96QFwELNaqccMPovwgFZn';

const selector = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.hidden = true;
error.hidden = true;
const arrBreedsId = [];
fetchBreeds()
  .then(response => {
    response.forEach(cat => {
      arrBreedsId.push({ text: cat.name, value: cat.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
  })
  .catch(e => {
    // error.hidden = false;
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

selector.addEventListener('change', creatMarkup);

function creatMarkup(e) {
  loader.hidden = false;
  selector.hidden = true;
  const catId = e.target.selectedOptions[0].value;
  fetchCatByBreed(catId).then(cat => {
    console.log(cat[0].breeds[0]);
    div.innerHTML = `<img src="${cat[0].url}" alt="${cat[0].breeds[0].alt_names}" width=500 heigth = 500><div class='rigth-column'><h1>${cat[0].breeds[0].name}</h1><h2>Temperament: ${cat[0].breeds[0].temperament}</h2><p>${cat[0].breeds[0].description}</p></div>`;
    loader.hidden = true;
    selector.hidden = false;
  });
}
