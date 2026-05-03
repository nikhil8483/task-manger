 
import db from "../config/db.js"
 
 const createUser = async ({ name, email, password , role = "user"}) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  )

  return {
    uid: result.insertId,
    name,
    email,
    role
  }
}

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT uid AS id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
    [email]
  )

  return rows[0] || null
}
export{ createUser, findUserByEmail }