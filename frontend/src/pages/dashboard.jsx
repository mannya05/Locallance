import Navbar from "../components/navbar"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import API from "../api/api"

export default function Dashboard() {
  const user = JSON.parse(
  localStorage.getItem("user")
)
  const navigate = useNavigate()

  const [gigs, setGigs] = useState([])
  const [applications, setApplications] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {

    const fetchGigs = async () => {
  try {
    const response = await API.get("/gigs")
    setGigs(response.data)
  } catch (error) {
    console.error(error)
  }
}

const fetchApplications = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    )

    const response = await API.get(
      `/applications/${user.name}`
    )

    setApplications(response.data)

  } catch (error) {
    console.error(error)
  }
}

const fetchUsers = async () => {
  try {

    const response = await API.get("/users")

    setUsers(response.data)

  } catch(error) {

    console.error(error)

  }
}
    fetchGigs()
    fetchApplications()
    fetchUsers()

  }, [])

  
  const deleteGig = async (id) => {

    try {

      await API.delete(`/gigs/${id}`)

      setGigs(
        gigs.filter((gig) => gig.id !== id)
      )

      toast.success("Gig deleted successfully!")

    } catch (error) {

      console.error(error)

    }

  }
console.log("Applications State:", applications)
  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <div>
  <h1 className="text-5xl font-bold">
    Hi {user?.name}!
  </h1>

  <p className="text-gray-400 mt-2">
    Welcome back to LocalLance
  </p>
</div>

          <button
            onClick={() => navigate("/post-gig")}
            className="bg-green-500 text-black px-6 py-3 rounded-2xl font-bold hover:opacity-80 transition"
          >
            + Post New Gig
          </button>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-14">

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

            <h3 className="text-gray-400">
              Gigs Posted
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-3">
              {
                gigs.filter(
                  (gig) => gig.user === user.name
                ).length
              }
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

            <h3 className="text-gray-400">
              Applications Sent
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-3">
              {applications.length}
            </p>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

            <h3 className="text-gray-400">
              Completed Projects
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-3">
              {
                 gigs.filter(
                    (gig) =>
                      gig.user === user.name &&
                      gig.status === "Completed"
                  ).length
              }
            </p>

          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

              <h3 className="text-gray-400">
                Active Gigs
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-3">
                {
                  gigs.filter(
                    (gig) =>
                      gig.user === user.name &&
                      gig.status !== "Completed"
                  ).length
                }
              </p>

            </div>

        </div>

        {/* My Posted Gigs */}
        <h2 className="text-3xl font-bold mb-6">
          My Posted Gigs
        </h2>

       <div className="grid md:grid-cols-2 gap-6 mb-14">
        {gigs.filter(
        (gig) => gig.user === user.name
        ).length === 0 ? (

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center">

          <h3 className="text-2xl font-bold mb-3">
            No Gigs Posted Yet !
          </h3>

          <p className="text-gray-400">
            Post your first gig and start hiring talent.
          </p>

          </div>

          ) : (

            gigs
              .filter(
                (gig) => gig.user === user.name
              )
              .map((gig) => (

              <div
                key={gig.id}
                className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
              >

                <h3 className="text-2xl font-bold">
                  {gig.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  Budget: ₹{gig.budget}
                </p>

                <p className="text-gray-500 mt-1">
                  Category: {gig.category}
                </p>

                <p className="text-gray-500 mt-1">
                  Posted By: {gig.user}
                </p>

               <div className="mt-2">

  <span
    className={`
      px-3 py-1 rounded-full text-sm font-bold

      ${gig.status === "Open"
        ? "bg-green-500 text-black"
        : ""}

      ${gig.status === "In Progress"
        ? "bg-yellow-500 text-black"
        : ""}

      ${gig.status === "Completed"
        ? "bg-blue-500 text-white"
        : ""}
    `}
  >
    {gig.status}
  </span>

</div>

                <div className="flex gap-3 mt-5 flex-wrap">

                  <button
                    onClick={() =>
                      navigate(`/gig/${gig.id}`)
                    }
                    className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold"
                  >
                    View Gig
                  </button>
                    
                    <button onClick={() =>
                  navigate(`/applicants/${gig.id}`)
                    }
                  className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold"
                    >
                  Applicants
                  </button>

                  <button
                  onClick={() =>
                  navigate(`/edit-gig/${gig.id}`)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold"
                  >
                  Edit
                  </button>

                  <button
                    onClick={() => {

                      const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this gig?"
                        )

                      if (confirmDelete) {

                        deleteGig(gig.id)

                      }

                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold"
                  >
                    Delete
                  </button>

                </div>

              </div>
              ))

            )}

        </div>

        {/* My Applications */}
<h2 className="text-3xl font-bold mb-6">
  My Applications
</h2>

<div className="grid md:grid-cols-2 gap-6">

  {applications.length === 0 ? (

    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center">

      <h3 className="text-2xl font-bold mb-3">
        No Applications Yet 📄
      </h3>

      <p className="text-gray-400">
        Browse gigs and start applying.
      </p>

    </div>

  ) : (

    applications.map((app) => {

    const gigOwner = gigs.find(
      (gig) => gig.id === app.gig_id
    )

    const ownerUser = users.find(
      (user) => user.name === gigOwner?.user
    )

    return (

      <div
        key={app.id}
        className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
      >

        <h3 className="text-xl font-bold">
          Gig #{app.gig_id}
        </h3>

        <p
          className={`mt-3 ${
            app.status === "Accepted"
              ? "text-green-400"
              : app.status === "Rejected"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {app.status}
        </p>

        {app.feedback && (

          <p className="mt-3 text-gray-300">
            Feedback: {app.feedback}
          </p>

        )}

        {app.status === "Accepted" &&
          ownerUser && (

          <div className="mt-4 bg-black border border-gray-700 rounded-xl p-4">

            <h4 className="text-green-400 font-bold mb-2">
              Client Contact
            </h4>

            <p className="text-gray-300">
              Name: {ownerUser.name}
            </p>

            <p className="text-gray-300">
              Email: {ownerUser.email}
            </p>

          </div>

        )}

        <div className="flex gap-3 mt-5">

          <button
            onClick={() =>
              navigate(`/gig/${app.gig_id}`)
            }
            className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold"
          >
            View Gig
          </button>

        </div>

      </div>

    )
  })

  )}

      </div>

    </div>
              {/* Recent Activity */}

              <div className="mt-16">

                <h2 className="text-3xl font-bold mb-6">
                  Recent Activity
                </h2>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

                  <ul className="space-y-4 text-gray-300">

                    <li>
                       Welcome to LocalLance!
                    </li>

                    <li>
                      📄 Applications Sent: {applications.length}
                    </li>

                    <li>
                      💼 Gigs Posted: {
                        gigs.filter(
                          (gig) => gig.user === user.name
                        ).length
                      }
                    </li>

                    <li>
                      🔥 Active Gigs: {
                        gigs.filter(
                          (gig) =>
                            gig.user === user.name &&
                            gig.status !== "Completed"
                        ).length
                      }
                    </li>

                  </ul>

                </div>

              </div>

    </div>

  )

}