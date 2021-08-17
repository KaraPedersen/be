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
      .then(results => {
        res.send(results);})
      .catch(next);
  })

  .get('/characters/user/:id', (req, res, next) => {
    Character.getAllFavorites(req.params.id)
      .then(results => res.send(results))
      .catch(next);
  })

  .put('/characters/user/:characterId/:userId', (req, res, next) => {

    Character.updateFavorite(req.params.characterId, req.params.userId, req.body)
      .then(results => res.send(results))
      .catch(next);
  });
