import {createTaskRepo, getTasksByUserRepo, getAllTasksRepo, updateTaskRepo, deleteTaskRepo} from "../repository/taskRepo.js";

// CREATE
export const createTaskService = async ({ title, status, userId }) => {
  if (!title) throw new Error("Title is required");

  return await createTaskRepo({ title, status, userId });
};

// GET
export const getTasksService = async ({ user }) => {
  if (user.role === "admin") {
    return await getAllTasksRepo();
  }

  return await getTasksByUserRepo({ userId: user.id });
};

// UPDATE
export const updateTaskService = async ({ title, status, taskId, userId }) => {
  return await updateTaskRepo({ title, status, taskId, userId });
};

// DELETE
export const deleteTaskService = async ({ taskId, userId }) => {
  return await deleteTaskRepo({ taskId, userId });
};


export const getAllTasksService = async () => {
  const tasks = await getAllTasksRepo();
  return tasks;
};