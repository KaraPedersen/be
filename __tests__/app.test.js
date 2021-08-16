import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('GET the character', async () => {
    const { body } = await request(app)
      .get('/characters/');

    expect(body.info.count).toBe(671);
    expect(body.results.length).toBe(20);
  });
});
