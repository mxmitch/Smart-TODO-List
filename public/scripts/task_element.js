const createTaskElement = (task) => {
  // Mapping of category ID to the icon class name from fontAwesome
  const categoryMapping = {
    '1': 'fa-cart-arrow-down', // product / buy
    '2': 'fa-utensils', // food / eat
    '3': 'fa-book-open', // books / read
    '4': 'fa-film', // movies / watch
  };
  const categoryIcon = categoryMapping[task.category_id];

  let priorityColour = "";
  if (task.priority === 3) {
    priorityColour = "red";
  } else if (task.priority === 2) {
    priorityColour = "orange";
  } else if (task.priority === 1) {
    priorityColour = "yellow";
  } else {
    priorityColour = "gray";
  }

  let detailsText = '';

  if (task.completed_date) {
    detailsText = `Completed ${new Date(task.completed_date).toDateString()}`;
  } else {
    detailsText = task.scheduled_date ? new Date(task.scheduled_date).toDateString() : '';
  }

  // Using Bootstrap's gridding system
  const taskElm = `
    <article class="task ${task.completed_date ? 'completed' : ''}">
      <div class="container">
        <div class="row">
          <div class="col col-2">
            <i class="fas ${categoryIcon} fa-2x"></i>
          </div>

          <div class="col col-7">
            <h3 class="task-name">${task.task_name}</h3>
            <span>${detailsText}</span>
          </div>
          <div class="col col-3 task-icons">
            <ul>
              <li><i class="fas fa-flag ${priorityColour}"></i></li>
            <li><a href="#"><i class="fas fa-edit"></a></i></li>
            <li><a href="#"><i class="fas fa-trash"></a></i></li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  `;
  return taskElm;
};

const renderTaskElm = (task) => {
  const taskList = $('.task-list');
  taskList.append(createTaskElement(task));
  taskList.children('.task:last-child').data(task);
};

const renderTaskElms = (taskArray) => {
  for (const task of taskArray) {
    console.log(task);
    renderTaskElm(task);
  }
};



// == Async functions ==
const deleteTask = function(event) {
  const taskElm = $(this).parents('.task');
  const options = {
    method: 'DELETE',
    url: `/tasks/${taskElm.data('id')}`,
  };
  $.ajax(options)
    .done(function(res) {
      taskElm.remove();
    })
    .fail(function(err) {
      console.error('Failed to remove task from DB', err);
    });
};

const editTask = function() {
  const taskElm = $(this).parents('.task');
  const taskData = taskElm.data();
  console.log('edit task: getting modal info', taskData, taskElm)
  $('#myModal').on('show.bs.modal', function(event) {
    const modal = $(this);
    modal.find('#checkbox').prop('checked', (taskData.completed_date) ? true : false);
    modal.find('#title').val(taskData.task_name);
    modal.find('#category').val(taskData.category_name);
    modal.find('.datepicker').val(taskData.scheduled_date ? new Date(taskData.scheduled_date).toLocaleDateString() : '');
    modal.find('#priority').val(taskData.priority);
    modal.off('show.bs.modal');
  });

  $('#myModal').data('taskId', taskData.id); // Attach task id if we are editing
  $("#newTask").click();
};

// == Document Ready ==
$(document).ready(function() {
  $.get('/tasks')
    .then((tasks) => {
      renderTaskElms(tasks);
    })
    .fail((err) => {
      console.error('failed to get tasks', err.stack);
    });



  // edit button onClick event
  // must use on('click') to select dynamically generated content. $.click() doesn't work
  $('.task-list')
    .on(
      'click',
      '.task .fa-edit',
      // Add some data to pass to handler?,
      editTask
    );

  // Delete button onClick event
  $('.task-list')
    .on(
      'click',
      '.task .fa-trash',
      // Add some data to pass to handler?,
      deleteTask
    );

  // Hide the menu whe you click on main or any of the navbar links on mobile breakpoint
  $('main, .mr-auto').click(function() {
    $('.navbar-collapse').removeClass('show');
    $('.navbar-collapse').addClass('hide');
  });

  // Clear modal form on click close modal button
  $('#myModal').on('hidden.bs.modal', function(e) {
    const modal = $(this);
    modal.find('#checkbox').prop('checked', false);
    modal.find('#title').val('');
    modal.find('#category').val('');
    modal.find('.datepicker').val('');
    modal.find('#priority').val('');

    // Need to removed attached data for next call
    $('#myModal').removeData('taskId');
  });

  $('task-list').on('animationstart');
  $('task-list').on('animationend');
  $('task-list').on('animationiteration');

});
