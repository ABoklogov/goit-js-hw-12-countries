export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }
  
    fetchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

    return fetch(url)
        .then(response => {
        if (!response.ok) {
            return { error: 'Ошибка! Страна не найдена' };
            }
            return response.json();
        })
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}