import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('user auth routes', () => {
  beforeAll(() => {
    return setup(pool);
  });
  const user = {
    username: 'Azlynn',
    password: 'password'
  };
  it('tests a signup route', async () => {
    const { body } = await request(app)
      .post('/api/auth/signup')
      .send(user);

    expect(body).toEqual({ username: 'Azlynn', userId: '1' });
  });
});
