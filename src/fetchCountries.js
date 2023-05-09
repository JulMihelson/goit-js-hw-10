const BASE_NAME = 'https://restcountries.com/v3.1/';
const SEARCH = '?fields=name,capital,population,flags,languages';

export const fetchCountries = country => {
  return fetch(`${BASE_NAME}name/${country}${SEARCH}`).then(response =>
    response.json()
  );
};
fetchCountries('Ukraine');
