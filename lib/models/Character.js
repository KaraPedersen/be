import pool from '../utils/pool.js';

export default class Character {
  characterId;
  userId;
  name;
  status;
  location;
  image;

  constructor(row){
    this.characterId = row.character_id;
    this.userId = row.user_id;
    this.name = row.name;
    this.status = row.status;
    this.location = row.location;
    this.image = row.image;
  }

  static async addFavorite({id, name, status, location, image}, {userId}){
    const {rows} = await pool.query(`INSERT INTO characters (character_id, user_id, name, status, location, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    ,[id, userId, name, status, location, image])

    return new Character(rows[0])
  }

  static async getAllFavorites(id){
    const {rows} = await pool.query(`
    SELECT * FROM characters WHERE user_id = $1`,
    [id])

    return rows.map(item => new Character(item))
  }

  static async updateFavorite(charId, userId, {location, name, status}){
    const {rows} = await pool.query(`
    UPDATE characters
    SET location = $1, name = $2, status = $3
    WHERE character_id = $4 AND user_id = $5
    RETURNING *
    `,[location, name, status, charId, userId])

    return new Character(rows[0])
  }
}