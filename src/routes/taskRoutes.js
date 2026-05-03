import express from "express";

import { createTask, getTasks, updateTask, deleteTask, getAllTasks } from "../controllers/taskController.js";

import verifyToken from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const protect = [verifyToken, authorizeRoles("user", "admin")];

router.post("/", ...protect, createTask);
router.get("/", ...protect, getTasks);
router.put("/:id", ...protect, updateTask);
router.delete("/:id", ...protect, deleteTask);

router.get("/all", verifyToken, authorizeRoles("admin"), getAllTasks);

export default router;