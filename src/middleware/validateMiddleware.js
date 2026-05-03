import { sanitize } from "../utils/sanitize.js"

 const validate = (rules) => {
  return (req, res, next) => {
    const data = sanitize(req.body)
    const errors = {}

    for (const field in rules) {
      const value = data[field]
      const rule = rules[field]

      // required
      if (rule.required && !value) {
        errors[field] = `${field} is required`
        continue
      }

      // min length
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = `${field} must be at least ${rule.minLength} characters`
      }

      // email check
      if (rule.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          errors[field] = "Invalid email format"
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors
      })
    }

    req.body = data // 🔥 sanitized data replace
    next()
  }
}
export { validate }