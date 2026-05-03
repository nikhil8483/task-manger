import { signupService , loginService} from "../services/authService.js"

 const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      })
    }

    const user = await signupService({ name, email, password })

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    })

  } catch (err) {
    // 🔥 DEBUG (IMPORTANT)
    console.error("Signup Error:", err)

    // duplicate user (service error)
    if (err.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: err.message
      })
    }

    // MySQL duplicate error
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      })
    }

    // fallback
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error"
    })
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

    const { token, user } = await loginService({ email, password })

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        role: user.role,    
        userId: user.id,
         name: user.name,   // ← BAS YEH ADD KARO
          email: user.email
      }
    })

  } catch (err) {
    console.error("Login Error:", err)

    if (
      err.message === "User not found" ||
      err.message === "Invalid credentials"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}
export{ signup, login}