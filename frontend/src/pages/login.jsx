import Navbar from "../components/navbar"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "../api/api"

export default function Login() {
  const navigate = useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleLogin = async (e) => {

  e.preventDefault()

  try {

    const response = await API.post(
      "/login",
      {
        email,
        password
      }
    )

    if (
      response.data.message ===
      "Login successful"
    ) {

      localStorage.setItem(
        "token",
        response.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      alert("Login Successful!")

      navigate("/dashboard")

    }

    else {

      alert(response.data.message)

    }

  }

  catch(error) {

    console.error(error)

    alert("Login Failed")

  }

}
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />
    <div className="max-w-3xl mx-auto px-8 pt-8">

  <Link
    to="/"
    className="text-gray-400 hover:text-green-400 transition text-lg"
  >
    ← Back to Home
  </Link>

</div>
      <div className="max-w-lg mx-auto px-8 py-20">

        {/* Glass Card */}
        <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-3xl p-10 shadow-2xl">

          <h1 className="text-5xl font-bold mb-4">
            Welcome Back
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 text-lg">
                Email
              </label>

              <input
  type="email"
  placeholder="xyz@gmail.com"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition"
/>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-lg">
                Password
              </label>

              <input
  type="password"
  placeholder="******"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition"
/>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-lg hover:opacity-80 transition"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-gray-400 text-center mt-6">
              Don’t have an account?{" "}

              <Link
                to="/register"
                className="text-green-400 hover:underline"
              >
                Register
              </Link>
            </p>

            <p
              onClick={() =>
                navigate("/forget-password")
              }
              className="text-green-400 cursor-pointer mt-4 text-center"
            >
              Forgot Password?
            </p>

          </form>

        </div>

      </div>

    </div>
  )
}

