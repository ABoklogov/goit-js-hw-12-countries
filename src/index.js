import { notice, info, success, error } from '@pnotify/core';
import debounce from 'lodash.debounce';
import countriesCard from './partials/countrie.hbs';
import countriesList from './partials/countries.hbs';
import CountriesApiService from './js/components/fetchCountries.js';

const refs = {
    cardContainer: document.querySelector('.card-container'),
    inputCountriesEl: document.querySelector('[name="countries"]'),
    listContainer: document.querySelector('#list-container'),
};

const countriesApiService = new CountriesApiService();

refs.inputCountriesEl.addEventListener('input', debounce(onCountiesInput, 500));

function onCountiesInput(e) {
    const searchQuery = e.target.value;

    countriesApiService.fetchCountries(searchQuery)
    .then(renderCountrieCard)
    .catch(onFatchError);
};

function renderCountrieCard(countrie) {
    if (countrie.length > 10) {
        
        if (refs.listContainer.firstChild) {
            document.querySelector('.list-countries').remove();
            
        } else if (refs.cardContainer.firstChild) {
            document.querySelector('.box-countrie').remove();
        };

        info({
            text: "Найдено слишком много совпадений. Пожалуйста, введите более конкретный запрос!"
        });
       
        console.log(countrie.length);
    } else if (countrie.length >= 2 && countrie.length <= 10) {

        if (refs.listContainer.firstChild) {
            document.querySelector('.list-countries').remove();

        } else if (refs.cardContainer.firstChild) {
             document.querySelector('.box-countrie').remove();
        };
        
        const countriesMarkup = countriesList(countrie);
        refs.listContainer.innerHTML = countriesMarkup;
        
        console.log(countrie.length);
    } else if (countrie.length === 1) {
        if (refs.listContainer.firstChild) {
                document.querySelector('.list-countries').remove();
            };
            
        const oneCountrieMarkup = countriesCard(countrie[0]);
        refs.cardContainer.innerHTML = oneCountrieMarkup;
    }
};

function onFatchError(error) {
    alert('Страна не найдена! Введите валидную строку!');
};
