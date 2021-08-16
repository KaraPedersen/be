import { Router } from 'express';
import RickAndMortyService from '../services/rickAndMortyAPI.js';

export default Router()
  .get('/characters', (req, res, next) => {
    RickAndMortyService.getAllCharacters()
      .then(results => res.send(results))
      .catch(next);
  });
