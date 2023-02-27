const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const taskPath = path.resolve(__dirname, "..", "db", "tasks.json");

const getAll = async () => {
  try {
    const rawData = await fs.readFile(taskPath, "utf-8");
    return JSON.parse(rawData, null, 2);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const tasks = await getAll();
    tasks.find((task) => String(task.id) === String(id));
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (title, completed) => {
  try {
    const id = crypto.randomUUID();
    const tasks = await getAll();
    const newTask = { id, title, completed };
    tasks.push(newTask);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return newTask;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (taskId, title, completed) => {
  try {
    const tasks = await getAll();
    const idx = tasks.findIndex(({ id }) => String(id) === String(taskId));
    if (idx === -1) {
      return null;
    }
    if (title) {
      tasks[idx].title = title;
    }
    if (completed) {
      tasks[idx].completed = completed;
    }
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 4));
    return tasks[idx];
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const deleteTask = async (id) => {
  try {
    const tasks = await getAll();
    const newTasks = tasks.find((task) => String(task.id) !== String(id));
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
};
