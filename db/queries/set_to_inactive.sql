UPDATE tasks
  SET is_active = false
  WHERE user_id = 1 
  AND tasks.id = 3;

  