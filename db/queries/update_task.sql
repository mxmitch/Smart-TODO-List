  UPDATE tasks
        SET
          category_id = 1,
          user_id = 1,
          task_name = 'Something',
          scheduled_date = null,
          completed_date = null,
          priority = null,
          details_url = null
        FROM categories
        WHERE tasks.id = 1 AND category_id = categories.id
        RETURNING ;
          tasks.id,
          category_id,
          category_name,
          user_id,
          task_name,
          created_date,
          scheduled_date,
          completed_date,
          priority,
          details_url,
          is_active;
