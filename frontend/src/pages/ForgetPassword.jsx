import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import API from "../api/api"
import Navbar from "../components/navbar"

export default function ForgotPassword() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleReset = async () => {

    try {

      await API.put(
        "/reset-password",
        null,
        {
          params: {
            email,
            password
          }
        }
      )

      toast.success("Password updated successfully!")

      navigate("/login")

    }

    catch (error) {

      console.error(error)

      toast.error("Failed to reset password")

    }

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex items-center justify-center py-24 px-6">

        <div className="
          bg-gray-900
          border
          border-gray-800
          p-10
          rounded-3xl
          w-full
          max-w-md
          shadow-2xl
        ">

          <h1 className="text-4xl font-bold mb-2">
            Forgot Password
          </h1>

          <p className="text-gray-400 mb-8">
            Enter your email and choose a new password.
          </p>

          <div className="mb-5">

            <label className="block mb-2 text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                p-4
                bg-black
                border
                border-gray-700
                rounded-xl
                outline-none
                focus:border-green-500
              "
            />

          </div>

          <div className="mb-8">

            <label className="block mb-2 text-gray-300">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-4
                bg-black
                border
                border-gray-700
                rounded-xl
                outline-none
                focus:border-green-500
              "
            />

          </div>

          <button
            onClick={handleReset}
            className="
              w-full
              bg-green-500
              text-black
              py-4
              rounded-xl
              font-bold
              text-lg
              hover:opacity-80
              transition
            "
          >
            Reset Password
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              w-full
              mt-4
              text-gray-400
              hover:text-green-400
              transition
            "
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>

  )

}