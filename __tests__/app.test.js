import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  let user = {
    username: 'Azlynn',
    password: 'password'
  };

  let rick;

  beforeAll(() => {
    return setup(pool)
      .then(() => 
        request(app).post('/api/auth/signup').send(user))
      .then(res => user = res.body);
  });

  test('GET the character', async () => {
    const { body } = await request(app)
      .get('/characters/all');

    expect(body.length).toBe(20);
  });

  test('add a character as a favorite POST', async () => {
    const character = {
      'id': 1,
      'name': 'Rick Sanchez',
      'status': 'Alive',
      'species': 'Human',
      'type': '',
      'gender': 'Male',
      'origin': {
        'name': 'Earth (C-137)',
        'url': 'https://rickandmortyapi.com/api/location/1'
      },
      'location': {
        'name': 'Earth(Replacement Dimension)',
        'url': 'https://rickandmortyapi.com/api/location/20'
      },
      'image': 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      'episode': [],
      'url': 'https://rickandmortyapi.com/api/character/1',
      'created': '2017-11-04T18:48:46.250Z'
    };

    const { body } = await request(app)
      .post('/characters/user')
      .send({ character, user });

    expect(body).toEqual({
      characterId: 1,
      userId: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      location: { name:'Earth(Replacement Dimension)',
        url:'https://rickandmortyapi.com/api/location/20' },
      image:'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    });

    rick = body;
  });

  test('gets all of a users favorite characters', async () => {
    const { body } = await request(app)
      .get(`/characters/user/${user.userId}`);

    expect(body).toEqual(expect.arrayContaining([{
      characterId: 1,
      userId: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      location: { name:'Earth(Replacement Dimension)', url:'https://rickandmortyapi.com/api/location/20' },        
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    }]));
  });

  test('updates user character', async () => {
    rick.status = 'DEAD';
    const { body } = await request(app)
    
      .put(`/characters/user/${rick.characterId}/${user.userId}`)
      .send(rick);
      
    expect(body).toEqual(rick);
  });

  test('deletes a user favorite character', async () => {
    const { body } = await request(app)
      .delete(`/characters/user/${rick.characterId}/${user.userId}`);

    expect(body).toEqual(rick);

    const getReq = await request(app)
      .get(`/characters/user/${user.userId}`);

    expect(getReq.body).toEqual([]);
  });
});
