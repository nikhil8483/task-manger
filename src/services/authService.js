import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { findUserByEmail, createUser } from "../repository/authRepo.js"

 const signupService = async (data) => {
  const { name, email, password } = data

  // check user exists
  const existing = await findUserByEmail(email)
  if (existing) {
    throw new Error("User already exists")
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // save user
  return await createUser({
    name,
    email,
    password: hashedPassword,
     role: "user" 
  })
}
 const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email)
  if (!user) throw new Error("User not found")

  // password check
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid credentials")

  //  JWT token generate
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  return { token , user }
}
export{ signupService , findUserByEmail,loginService}