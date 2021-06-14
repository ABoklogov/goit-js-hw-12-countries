export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }
    
    fetchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

    return fetch(url)
        .then(response => {
            return response.json()    
        })
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}