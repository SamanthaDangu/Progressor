let tasks = [];
const storageKey = 'tasks-vue';

function create(task) {
  tasks = [task, ...tasks];
  console.log("tasks", tasks);
  save();
}

function read() {
  tasks = retrieveTasks();
  return tasks;
}

function updateTask(task) {
  const index = tasks.findIndex(t => t.id === task.id)

  if (index === -1) {
    return;
  }
  tasks[index] = task;
  save();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}

function convertCase(temporalityKebabCase) {
  let result;
  switch (temporalityKebabCase) {
    case "short-term":
      result = "Court terme";
      break;
    case "medium-term":
      result = "Moyen terme";
      break;
    case "long-term":
      result = "Long terme";
      break;
    default:
      result = temporalityKebabCase;
      break;
  }
  return result;
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function retrieveTasks() {
  const fromLocalStorage = localStorage.getItem(storageKey);
  return JSON.parse(fromLocalStorage);
}

export default {
  create,
  read,
  updateTask,
  deleteTask,
  convertCase,
};
