export default class CountriesApiService {
    constructor() { }
    
    fetchCountries(countrieName) {
    const url = `https://restcountries.eu/rest/v2/name/${countrieName}`;

   return fetch(url)
       .then(response => {
           if (response.ok) {
               return response.json()
           };
       })
};
}