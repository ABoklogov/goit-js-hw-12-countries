import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
        
export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }
  
    fetchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

    return fetch(url)
        .then(response => {
        //    console.log(response);
            if (response.status == 404) {
                error({
                text: "Ошибка! Страна не найдена."
                });
                // return { error: 'Что-то пошло не так' };
           }
            return response.json()    
        })
        // .then(data => {
        //     if (data.error) return console.log('у нас ошибка' + data.error);
        
        //     return data
        // })
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}