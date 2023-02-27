const { program } = require("commander");
const {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
} = require("./handlers/handlers");

program
  .name("MyCLI")
  .description("A simple CLI to manage your tasks")
  .version(1.0);
program
  .option("--method <method>", "Action to perform")
  .option("--id <id>", "Task id")
  .option("--title <title>", "Task title")
  .option("--completed <completed>", "Task completion status");
program.parse(process.argv);
const { method, id, title, completed } = program.opts();
console.log(method, id, title, completed);

(async () => {
  if (method === "list") {
    const result = await getAll();
    console.log(result);
  }
  if (method === "get") {
    const result = await getById(id);
    if (!result) {
      throw new Error(`Product with ${id} not found`);
    }
    console.log(result);
  }
  if (method === "create") {
    const result = await createTask(title, completed);
    console.log(result);
  }
  if (method === "update") {
    const taskToUpdate = await updateTask(id, title, completed);
    console.log(taskToUpdate);
    if (!taskToUpdate) {
      throw new Error(`Product with ${id} not found`);
    }
  }
  if (method === "delete") {
    await deleteTask(id);
  }
})();
