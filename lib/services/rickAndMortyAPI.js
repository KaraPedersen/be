import fetch from 'node-fetch';

export default class RickAndMortyService{
  static async getAllCharacters(){
    return fetch('https://rickandmortyapi.com/api/character')

      .then(res => res.json());
  }
}
