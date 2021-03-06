import { Router } from 'express';
import User from '../models/User.js';

export default Router()
  .post('/api/auth/signup', (req, res, next) => {
    User.signUp(req.body)
      .then(response => res.send(response))
      .catch(next);
  })

  .post('/api/auth/login', (req, res, next) => {
    User.findByUsername(req.body)
      .then(response => res.send(response))
      .catch(next);
  });
