DROP TABLE IF EXISTS characters;
-- CREATE TABLE users (
--   user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   username TEXT NOT NULL,
--   password TEXT NOT NULL
-- );
CREATE TABLE characters (
  character_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL
)