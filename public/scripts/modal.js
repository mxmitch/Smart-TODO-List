$('.datepicker').datepicker({
  format: 'mm/dd/yyyy',
  startDate: '-3d'
});

const replaceTask = (taskToReplace, newTask) => {
  // $(newElement).data(newTask);
  const newElm = $(createTaskElement(newTask)).replaceAll(taskToReplace);
  newElm.data(newTask);
  console.log('new task', newElm);
  // console.log(newElement, newElement.data())
};


const createUpdateTasks = function(e) {
  e.preventDefault();

  const categoryNameMapping = {
    'buy': 1,
    'eat': 2,
    'read': 3,
    'watch': 4
  };

  const scheduled_date = $(this).find('.datepicker').val();
  const task_name = $(this).find('#title').val();

  const data = {
    category_id: categoryNameMapping[$(this).find('#category').val()],
    task_name: task_name !== '' ? task_name : null,
    scheduled_date: scheduled_date ? new Date(scheduled_date).toISOString() : null,
    completed_date: $(this).find('#checkbox').prop('checked') ? new Date().toISOString() : null,
    priority: $(this).find('#priority').val(),
    details_url: null,
  };

  const options = {
    method: 'POST',
    url: `/tasks`,
    data: $.param(data)
  };

  const taskId = $(this).parents('#myModal').data('taskId');
  console.log('taskId before sending to SQL', taskId)
  if (taskId) {
    options.method = 'PUT';
    options.url += `/${taskId}`;
    options.id = taskId;
  }
  console.log('toption before sending to SQL', options)
  // Need to removed attached data for next call
  $('#myModal').removeData('taskId');

  $.ajax(options)
    .done(function(res) {
      console.log('res', res.id);
      console.log(res);
      const tasksArray = [...$('.task-list').children('.task')];
      console.log(tasksArray);
      const taskToReplace = tasksArray.filter(function(taskElm) {
        console.log('loop:', $(taskElm).data('id'), 'res.id', res.id);
        return $(taskElm).data('id') === res.id;
      })[0];
      console.log('task to replace:', taskToReplace);
      if (taskToReplace) {
        replaceTask(taskToReplace, res);

      } else {
        renderTaskElm(res);
      }
      $('#myModal').modal('hide');

      animateSort(
        $('.task-list'),
        getHideListByCategory(res.category_name),
        getShowListByCategory(res.category_name)
      );
    })
    .fail(function(err) {
      console.error('Failed to submit form', err);
    });
};

// == DOCUMENT READY ==
$(document).ready(function() {
  $('form').on('submit', createUpdateTasks);
});
