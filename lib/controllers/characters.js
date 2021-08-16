import { Router } from 'express';
import RickAndMortyService from '../services/rickAndMortyAPI.js';
import Character from '../models/Character.js';

export default Router()
  .get('/characters/all', (req, res, next) => {
    RickAndMortyService.getAllCharacters()
      .then(results => res.send(results.results))
      .catch(next);
  })

  .post('/characters/user', (req, res, next) => {
    Character.addFavorite(req.body.character, req.body.user)
      .then(results => res.send(results))
      .catch(next);
  });
