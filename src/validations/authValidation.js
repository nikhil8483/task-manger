const signupRules = {
  name: {
    required: true,
    minLength: 3
  },
  email: {
    required: true,
    type: "email"
  },
  password: {
    required: true,
    minLength: 6
  }
}
export { signupRules }