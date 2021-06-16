export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }
    
    fetchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                return { error: 'Что-то пошло не так' };
           }
            return response.json()    
        })
            .then(data => {
                if(data.error) return console.log(data.error);
                console.log('ошибки нет', data);
            })
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}