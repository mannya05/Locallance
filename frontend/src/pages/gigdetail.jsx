import Navbar from "../components/navbar"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api/api"

export default function GigDetail() {

  const { id } = useParams()
  const navigate = useNavigate()

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  )

  const [gig, setGig] = useState(null)
  const [alreadyApplied, setAlreadyApplied] = useState(false)

  useEffect(() => {

    const fetchGig = async () => {

      try {

        const response = await API.get(`/gigs/${id}`)
        setGig(response.data)

        const user = JSON.parse(
          localStorage.getItem("user")
        )

        if (user) {

          const appResponse = await API.get(
            `/applications/${user.name}`
          )

          const applied = appResponse.data.some(
            (app) => app.gig_id === Number(id)
          )

          setAlreadyApplied(applied)
        }

      } catch (error) {

        console.error(error)

      }

    }

    fetchGig()

  }, [id])

  if (!gig) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-8 pt-8">

        <Link
          to="/dashboard"
          className="text-gray-400 hover:text-green-400 transition"
        >
          ← Back to Dashboard
        </Link>

      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10">

          <div className="flex justify-between items-start flex-wrap gap-6">

            <div>

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                {gig.category}
              </span>

              <h1 className="text-5xl font-bold mt-5 mb-3">
                {gig.title}
              </h1>

              <p className="text-gray-400">
                Posted by {gig.user}
              </p>

              <p className="mt-2 text-green-400 font-semibold">
                  Status: {gig.status}
              </p>

            </div>

            <div className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold text-xl">
              ₹{gig.budget}
            </div>

          </div>

          {/* Description */}
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-4">
              Description
            </h2>

            <p className="text-gray-400 leading-8">
              {gig.description}
            </p>

          </div>

          {/* Client Info */}
          <div className="mt-12 bg-black border border-gray-800 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Client Information
            </h2>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-black">
  {gig.user
    .split(" ")
    .map(name => name[0])
    .join("")
    .slice(0,2)
    .toUpperCase()}
</div>

              <div>

                <h3 className="text-xl font-bold">
                  {gig.user}
                </h3>

                <p className="text-gray-400">
                  ⭐ New User
                </p>

              </div>

            </div>

          </div>

          {/* Apply Button */}
          {gig.user !== currentUser?.name && (

            <button
              disabled={alreadyApplied}
              onClick={() => navigate(`/apply/${gig.id}`)}
              className={`w-full mt-10 py-5 rounded-2xl font-bold text-xl ${
                alreadyApplied
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-green-500 text-black hover:opacity-80"
              }`}
            >
              {
                alreadyApplied
                  ? "Already Applied"
                  : "Apply for Gig"
              }
            </button>

          )}

        </div>

      </div>

    </div>

  )

}