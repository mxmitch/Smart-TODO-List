DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_name TEXT NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  priority SMALLINT CHECK (priority >= 0 AND priority <= 3),
  details_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);
