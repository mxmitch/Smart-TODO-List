UPDATE tasks
  SET completed_date = now()
  WHERE user_id = 1 
  AND tasks.id = 3;

