const express = require('express');
const router = express.Router();
const {
  fetchCategory
} = require('./help_files/get_category');
const {
  queryCategoryFromName
} = require('./help_files/query_category_from_name');

module.exports = (db) => {
  const insertTask = function(req, res, catId) {
    const queryParams = [
      catId ? catId : Number(req.body.category_id),
      Number(req.session.user_id),
      req.body.task_name,
      req.body.scheduled_date ? req.body.scheduled_date : null,
      req.body.completed_date ? req.body.completed_date : null,
      req.body.priority ? req.body.priority : null,
      req.body.details_url ? req.body.details_url : null
    ];

    const queryString = `
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
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
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
      `;

    db.query(queryString, queryParams)
      .then(data => {
        const task = data.rows[0];
        res.send(task);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  };



  router.get("/", (req, res) => {
    const queryString = `
      SELECT
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
          is_active
        FROM tasks
          JOIN categories ON categories.id = category_id
        WHERE user_id = $1
          AND is_active = TRUE
        ORDER BY scheduled_date ASC, created_date ASC, priority DESC;
    `;
    const queryParams = [req.session.user_id];

    db.query(queryString, queryParams)
      .then(data => {
        const tasks = data.rows;
        res.send(tasks);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.post("/", (req, res) => {
    if (!req.body.category_id) {
      fetchCategory(req.body.task_name)
        .then(probability => {
          const items = probability.classification;
          let highest = 0;
          let catName = "buy"; // default to buy/products categories
          console.log('fetched:', probability, 'items:', items);
          for (const item in items) {
            console.log('get highest prob');
            console.log(item, ':', items[item]);
            if (items[item] > highest) {
              highest = items[item];
              catName = item;
            }
            console.log(catName);
          }
          console.log('in post', probability);
          queryCategoryFromName(db, catName)
            .then(catId => {
              console.log(catId);
              insertTask(req, res, catId.id);
            })
            .catch((err) => {
              console.error("Failed query to get category name", err.message);
            });
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: err.message
            });
        });
    } else {
      insertTask(req, res);
    }
  });



  router.put("/:taskId", (req, res) => {
    const queryString = `
      UPDATE tasks
        SET
          category_id = $1,
          user_id = $2,
          task_name = $3,
          scheduled_date = $4,
          completed_date = $5,
          priority = $6,
          details_url = $7
        FROM categories
        WHERE tasks.id = $8 AND $1 = categories.id
        RETURNING
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
          is_active
        ;
    `;
    const queryParams = [
      Number(req.body.category_id),
      Number(req.session.user_id),
      req.body.task_name,
      req.body.scheduled_date ? req.body.scheduled_date : null,
      req.body.completed_date ? req.body.completed_date : null,
      Number(req.body.priority),
      req.body.details_url ? req.body.details_url : null,
      Number(req.params.taskId)
    ];

    console.log('PUT query params', queryParams);

    db.query(queryString, queryParams)
      .then(data => {
        const tasks = data.rows[0];
        console.log('task from SQL query', tasks);
        res.send(tasks);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.delete("/:taskId", (req, res) => {
    const queryString = `
      UPDATE tasks
        SET is_active = false
        WHERE user_id = $1
          AND tasks.id = $2
        RETURNING *;
    `;
    const queryParams = [
      Number(req.session.user_id),
      Number(req.params.taskId)
    ];

    console.log('params', queryParams);
    db.query(queryString, queryParams)
      .then(data => {
        res.send(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });
  return router;
};
