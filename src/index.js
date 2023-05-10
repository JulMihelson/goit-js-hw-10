import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
const ul = document.querySelector('.country-list');
const countryInfoCard = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(event => {
    fetchCountries(event.target.value.trim())
      .then(getData)
      .catch(error => {
        Notify.failure(error.message);
      });
  }, DEBOUNCE_DELAY)
);

function getData(data) {
  if (data.length > 10) {
    countryInfoCard.innerHTML = ' ';
    ul.innerHTML = ' ';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length <= 10 && data.length >= 2) {
    const html = data.reduce((acc, el) => {
      return (
        acc +
        `<li><img src="${el.flags.svg}" alt="${el.name.official}" width="50"><h2>${el.name.official}</h2></li>`
      );
    }, '');
    ul.innerHTML = html;
  }
  if (data.length === 1) {
    countryInfoCard.innerHTML = data.map(generateCountryInfoCard).join('');
  }
}

function generateCountryInfoCard(el) {
  return `<li>
    <img src="${el.flags.svg}" alt="${el.name.official}" width="50">
    <h2>${el.name.official}</h2>
    <p>Capital: ${el.capital}</p>
    <p>Language: ${Object.values(el.languages).join(', ')}</p>
    <p>Population: ${el.population}</p>
  </li>`;
}
