// const createTaskElement = (task) => {
//   // Mapping of category ID to the icon class name from fontAwesome
//   const categoryMapping = {
//     '1': 'fa-cart-arrow-down', // product / buy
//     '2': 'fa-utensils', // food / eat
//     '3': 'fa-book-open', // books / read
//     '4': 'fa-film', // movies / watch
//   };
//   const categoryIcon = categoryMapping[task.category_id];

//   // Using Bootstrap's gridding system
//   const taskElm = `
//     <article class="task container">
//       <div class="row align-items-center">
//         <i class="fas ${categoryIcon} col col-1"></i>
//         <h3 class="task-name col col-8">${task.task_name || 'default todo'}</h3>
//         <i class="far fa-flag col col-1"></i>
//         <i class="fas fa-edit col col-1"></i>
//         <i class="fas fa-trash col col-1"></i>
//       </div>
//       <div class="row align-items-center">
//         <div class="col col-1"></div>
//         <p class="created-at col col-8">${task.scheduled_date || 'default time'}</p>
//         <div class="col col-1"></div>
//         <div class="col col-1"></div>
//         <div class="col col-1"></div>
//       </div>
//     </article>
//   `;
//   return taskElm;
// };

// const renderTaskElm = (task) => {
//   const taskList = $('.task-list');
//   taskList.append(createTaskElement(task));
//   taskList.children('.task:last-child').data(task);
// };

// const renderTaskElms = (taskArray) => {
//   for (const task of taskArray) {
//     renderTaskElm(task);
//   }
// };



// module.exports = {
//   renderTaskElm,
//   renderTaskElms,
// };
