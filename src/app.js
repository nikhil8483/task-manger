import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "./config/db.js"
import routes from "./routes/index.js"

dotenv.config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

//  MAIN ROUTES
app.use("/api/v1", routes)

// 404 handler (LAST me)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  })
})

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Internal Server Error"
  })
})

const PORT = process.env.PORT || 5000
console.log("JWT_SECRET:", process.env.JWT_SECRET);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})