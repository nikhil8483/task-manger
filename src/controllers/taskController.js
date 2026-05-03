import e from "express";
import {createTaskService, getTasksService, updateTaskService, deleteTaskService,getAllTasksService} from "../services/taskService.js";

const createTask = async (req, res, next) => {
  try {
    const { title, status } = req.body;   // ✅ FIX

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const data = await createTaskService({
      title,
      status: status || 'pending',   // ✅ default fallback
      userId: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data
    });

  } catch (error) {
    next(error);
  }
};

/**
 * GET TASKS (USER / ADMIN)
 */
 const getTasks = async (req, res, next) => {
  try {
    const data = await getTasksService({ user: req.user });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE TASK
 */
const updateTask = async (req, res, next) => {
  try {
    const { title, status } = req.body;   // ✅ FIX
    const { id } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const data = await updateTaskService({
      title,
      status,           
      taskId: id,
      userId: req.user.id
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * DELETE TASK
 */
 const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await deleteTaskService({
      taskId: id,
      userId: req.user.id
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

 const getAllTasks = async (req, res, next) => {
  try {
    const data = await getAllTasksService();

    return res.status(200).json({
      success: true,
      message: "All tasks fetched successfully",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export { createTask, getTasks, updateTask, deleteTask,getAllTasks };