import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")

  }

  return (

    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">

      <Link to="/">
        <h1 className="text-3xl font-bold text-green-400">
          LocalLance
        </h1>
      </Link>

      <div className="flex gap-8 text-gray-300 text-lg items-center">

        <Link
          to="/"
          className="hover:text-green-400 transition"
        >
          Home
        </Link>

        {token ? (

          <>

            <Link
              to="/dashboard"
              className="hover:text-green-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/browse"
              className="hover:text-green-400 transition"
            >
              Browse
            </Link>

            <Link
              to="/post-gig"
              className="hover:text-green-400 transition"
            >
              Post Gig
            </Link>

            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              className="hover:text-green-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-green-400 transition"
            >
              Register
            </Link>

          </>

        )}

      </div>

    </nav>

  )

}