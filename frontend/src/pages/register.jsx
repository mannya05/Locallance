import Navbar from "../components/navbar"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useState } from "react"
import API from "../api/api"

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {

  e.preventDefault()

  try {

    const registerResponse = await API.post(
      "/register",
      {
        name,
        email,
        password
      }
    )

    if (
      registerResponse.data.message ===
      "Registration successful"
    ) {

      const loginResponse = await API.post(
        "/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        loginResponse.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(
          loginResponse.data.user
        )
      )

      toast.success("Registration Successful!")

      navigate("/dashboard")

    }

    else {

      toast.success(
        registerResponse.data.message
      )

    }

  }

  catch(error) {

    console.error(error)

    toast.error("Registration failed")

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

        <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-3xl p-10 shadow-2xl">

          <h1 className="text-5xl font-bold mb-4">
            Create Account
          </h1>

          <p className="text-gray-400 text-lg mb-10 leading-8">
            Join your campus freelancing community and start earning today.
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 text-lg">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Jack"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition"
              />

            </div>

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

            <button
              type="submit"
              className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-lg hover:opacity-80 transition"
            >
              Create Account
            </button>

            <p className="text-gray-400 text-center mt-6">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-green-400 hover:underline"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  )
}