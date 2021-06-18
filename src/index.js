import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

import debounce from 'lodash.debounce';
import countriesCard from './partials/countrie.hbs';
import countriesList from './partials/countries.hbs';
import CountriesApiService from './js/fetchCountries.js';

const refs = {
    inputCountriesEl: document.querySelector('[name="countries"]'),
    cardContainer: document.querySelector('.card-container'),
    listContainer: document.querySelector('#list-container'),
};

const countriesApiService = new CountriesApiService();

refs.inputCountriesEl.addEventListener('input', debounce(onCountiesInput, 500));

function onCountiesInput(e) {
    
    countriesApiService.query = e.target.value.trim();
    removeCardAndListCountries();

    countriesApiService.fetchCountries()
    .then(errorHandling)
    .then(renderCountrieCard)
    .catch(onFatchError);
};

function renderCountrieCard(countrie) {
    if (countrie.length > 10) {

        info({
            text: "Найдено слишком много совпадений. Пожалуйста, введите более конкретный запрос!"
        });
       
    } else if (countrie.length >= 2 && countrie.length <= 10) {
        
        refs.listContainer.insertAdjacentHTML('beforeend', countriesList(countrie));
        
    } else if (countrie.length === 1) {

        if (refs.listContainer.firstChild) {
                refs.listContainer.innerHTML = '';
            };
            
        refs.cardContainer.insertAdjacentHTML('beforeend', countriesCard(countrie[0]));
    }
};

function onFatchError(error) {
    alert(error);
    };

function removeCardAndListCountries() {
    if (refs.listContainer.firstChild) {
        refs.listContainer.innerHTML = '';
    } else if (refs.cardContainer.firstChild) {
        refs.cardContainer.innerHTML = '';
    };
};

function errorHandling(data) {
        if (data.error) {
            error({ text: data.error });
        }
    return data;
};

// fetchCountries() {
//   const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;
//   return fetch(url).then(response => response.ok ? response.json() : response);
// };
// function onCountiesInput(e) {
//     countriesApiService.query = e.target.value.trim();
//     removeCardAndListCountries();
//     if (!countriesApiService.query) return;
//     countriesApiService.fetchCountries()
//       .then(renderCountrieCard)
//       .catch(onFatchError);
// };
// function renderCountrieCard(countrie) {
//   removeCardAndListCountries();
//   if (countrie.length > 10) {
//  return info({ text: "Найдено слишком много совпадений. Пожалуйста, введите более конкретный запрос!" });
//   }
//   if (countrie.length >= 2 && countrie.length <= 10) {
//     return refs.listContainer.insertAdjacentHTML('beforeend', countriesList(countrie));
//   }
//   if (countrie.length === 1) {
//      return refs.cardContainer.insertAdjacentHTML('beforeend', countriesCard(countrie[0]));
//   }
//   error({ text: "Страна не найдена." });
// };
// function onFatchError(err) {
//   error({ text: err });
// };
// function removeCardAndListCountries() {
//   refs.listContainer.innerHTML = '';
//   refs.cardContainer.innerHTML = '';
// };