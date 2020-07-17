WITH insert_instr AS (
  INSERT INTO tasks (
    category_id,
    user_id,
    task_name,
    scheduled_date,
    completed_date,
    priority,
    details_url)
  VALUES (
    3,
    3,
    'Read the newspaper',
    now(),
    NULL,
    NULL,
    NULL
  )
  RETURNING
    tasks.id,
    category_id,
    user_id,
    task_name,
    created_date,
    scheduled_date,
    completed_date,
    priority,
    details_url,
    is_active
)
SELECT
  insert_instr.id,
  category_id,
  category_name,
  user_id,
  task_name,
  created_date,
  scheduled_date,
  completed_date,
  priority,
  details_url,
  is_active
  FROM insert_instr
    JOIN categories ON categories.id = category_id;

