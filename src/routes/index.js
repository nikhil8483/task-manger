import express from "express"
import authRoutes from "./authAuth.js"
import taskRoutes from "./taskRoutes.js";

const router = express.Router()

// health check
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀"
  })
})

// 🔐 auth routes
router.use("/auth", authRoutes)
router.use("/tasks", taskRoutes);

// 📦 future routes
// router.use("/tasks", taskRoutes)

export default router