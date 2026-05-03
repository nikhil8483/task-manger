import  db  from "../config/db.js";

// CREATE
export const createTaskRepo = async ({ title, status, userId }) => {
  const [result] = await db.query(
    "INSERT INTO tasks (title, status, userid) VALUES (?, ?, ?)",
    [title, status, userId]
  );

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE tid=?",
    [result.insertId]
  );

  return rows[0];
};

// GET USER TASKS
export const getTasksByUserRepo = async ({ userId }) => {
  const [rows] = await db.query(
    "SELECT tid, title, status, created_at FROM tasks WHERE userid = ? ORDER BY created_at DESC",
    [userId]
  );

  return rows;
};


export const updateTaskRepo = async ({ title, status, taskId, userId }) => {
  const [result] = await db.query(
    "UPDATE tasks SET title=?, status=? WHERE tid=? AND userid=?",
    [title, status, taskId, userId]   // ✅ correct order
  );

  if (result.affectedRows === 0) {
    throw new Error("Task not found or unauthorized");
  }

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE tid=?",
    [taskId]
  );

  return rows[0];
};

export const deleteTaskRepo = async ({ taskId, userId }) => {
  const [result] = await db.query(
    "DELETE FROM tasks WHERE tid=? AND userid=?",
    [taskId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Task not found or unauthorized");
  }

  return { message: "Task deleted" };
};
export const getAllTasksRepo = async () => {
  const [rows] = await db.query(
    "SELECT tid, title, status, userid, created_at FROM tasks ORDER BY created_at DESC"
  );

  return rows;
};