import pool from '../utils/pool.js';

export default class User {
  userId;
  username;
  password;

  constructor(row){
    this.userId = row.user_id;
    this.username = row.username;
    this.password = row.password;
  }

  static async signUp({username, password}){
    const {rows} = await pool.query(`
    INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username
    `, [username, password])

    return new User(rows[0]);
  }

  static async findByUsername({username, password}){
    const {rows} = await pool.query(`
    SELECT user_id, username FROM users WHERE username = $1 AND password = $2`, [username, password])

    if(!rows[0]) return 'Invalid username or password'
    return new User(rows[0])
  }

}