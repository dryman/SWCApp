-- 
-- Created by SQL::Translator::Producer::SQLite
-- Created on Wed Dec 21 14:09:05 2011
-- 

;
BEGIN TRANSACTION;
--
-- Table: article
--
CREATE TABLE article (
  id INTEGER PRIMARY KEY NOT NULL,
  title text NOT NULL,
  content text,
  snippet text,
  url text,
  cluster integer NOT NULL DEFAULT 0
);
--
-- Table: session
--
CREATE TABLE session (
  sid INTEGER PRIMARY KEY NOT NULL,
  data text NOT NULL,
  expires integer NOT NULL
);
--
-- Table: user
--
CREATE TABLE user (
  id INTEGER PRIMARY KEY NOT NULL,
  ptt text NOT NULL,
  userAgent text,
  set_id integer
);
CREATE UNIQUE INDEX user_ptt ON user (ptt);
--
-- Table: random_set
--
CREATE TABLE random_set (
  id INTEGER PRIMARY KEY NOT NULL,
  ord integer NOT NULL,
  set_id integer NOT NULL,
  article_id integer NOT NULL,
  FOREIGN KEY(article_id) REFERENCES article(id)
);
CREATE INDEX random_set_idx_article_id ON random_set (article_id);
--
-- Table: time_stamp
--
CREATE TABLE time_stamp (
  id INTEGER PRIMARY KEY NOT NULL,
  time datetime NOT NULL,
  post_option integer NOT NULL DEFAULT 0,
  article_id integer NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY(article_id) REFERENCES article(id),
  FOREIGN KEY(user_id) REFERENCES user(id)
);
CREATE INDEX time_stamp_idx_article_id ON time_stamp (article_id);
CREATE INDEX time_stamp_idx_user_id ON time_stamp (user_id);
COMMIT;
