class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=b61ac5a72b1b25d299712c16da3e0fc3';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter (res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let newDescr = char.description !== '' ? char.description : 'NO DESCRIPTION';
        if (newDescr.length>50) {newDescr = newDescr.slice(0,100)+'...' } 
         
        return {
            name: char.name,
            description: newDescr,
            thumbnail: char.thumbnail.path + '.'+ char.thumbnail.extension,
            id: char.id,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

}

export default MarvelService;