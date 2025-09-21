import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"


function SignInForm({ onSubmit }) {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#f9fdff" }}>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-[448px] border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 text-center ">Sign In</h2>
        <p className="text-gray-500 text-center mb-2 text-sm">Enter your credentials to access your account</p>

        {/* Username */}
        <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          className="w-full border text-sm border-gray-100 rounded-2xl px-4 py-2.5 mb-3  focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 shadow-inner"
        />

        {/* Password */}
        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full border  border-gray-100 rounded-2xl text-sm px-4 py-2.5 mb-1  focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium rounded-2xl py-2 text-base hover:bg-blue-400 transition-colors"
        >
          Sign In
        </button>

        {/* Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-medium hover:text-blue-600">
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}

// Password validation function
const validatePassword = (password) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  }
}

function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const validations = validatePassword(formData.password)
  const showPasswordValidation = formData.password.length > 0

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allValid = Object.values(validations).every(Boolean)
    if (!allValid) {
      alert("Password does not meet requirements!")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#f9fdff" }}>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-[448px] border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-1">Sign Up</h2>
        <p className="text-gray-500 text-center mb-4 text-sm">Create an account to get started</p>

        {/* Username */}
        <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          required
          className="w-full border text-sm border-gray-100 rounded-2xl px-4 py-2.5 mb-3  focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 shadow-inner"
        />

        {/* Password */}
        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className="w-full border  border-gray-100 rounded-2xl text-sm px-4 py-2.5 mb-1  focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

            {showPasswordValidation && (
              <ul className="text-sm mb-2 space-y-1">
                <li className={validations.length ? "text-green-600" : "text-[#64748b]"}>
                  {validations.length ? "✓" : "×"} At least 8 characters
                </li>
                <li className={validations.uppercase ? "text-green-600" : "text-[#64748b]"}>
                  {validations.uppercase ? "✓" : "×"} One uppercase letter
                </li>
                <li className={validations.lowercase ? "text-green-600" : "text-[#64748b]"}>
                  {validations.lowercase ? "✓" : "×"} One lowercase letter
                </li>
                <li className={validations.number ? "text-green-600" : "text-[#64748b]"}>
                  {validations.number ? "✓" : "×"} One number
                </li>
              </ul>
            )}

            {/* Confirm Password */}
        <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="w-full border border-gray-100 rounded-2xl px-4 text-sm py-2.5 mb-1  focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 shadow-inner"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium rounded-2xl py-3 text-base hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>

        {/* Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 font-medium hover:text-blue-400">
            Sign in
          </a>
        </p>
      </form>
    </div>
  )
}


function AuthForm({ type = "signin", onSubmit }) {
  if (type === "signup") {
    return <SignUpForm onSubmit={onSubmit} />
  }
  return <SignInForm onSubmit={onSubmit} />
}

export default AuthForm
