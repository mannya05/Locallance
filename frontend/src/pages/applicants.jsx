import Navbar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import API from "../api/api"

export default function Applicants() {

  const { gigId } = useParams()

  const [applications, setApplications] = useState([])
  const [feedbacks, setFeedbacks] = useState({})

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {

    try {

      const response = await API.get(
        `/gigs/${gigId}/applications`
      )

      setApplications(response.data)

    } catch (error) {

      console.error(error)

    }

  }

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      await API.put(
        `/applications/${applicationId}`,
        null,
        {
          params: {
            status,
            feedback:
              feedbacks[applicationId] || ""
          }
        }
      )

      await fetchApplications()

      toast.success(`${status} Successfully!`)

    } catch (error) {

      console.error(error)

      toast.error("Failed to update status")

    }

  }

  const saveFeedback = async (
    applicationId
  ) => {

    try {

      const application = applications.find(
        (app) => app.id === applicationId
      )

      await API.put(
        `/applications/${applicationId}`,
        null,
        {
          params: {
            status: application.status,
            feedback:
              feedbacks[applicationId] || ""
          }
        }
      )

      await fetchApplications()

      toast.success("Feedback Saved Successfully!")

    } catch (error) {

      console.error(error)

      toast.error("Failed to save feedback")

    }

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      
      <div className="max-w-5xl mx-auto px-8 py-12">
        

        <h1 className="text-5xl font-bold mb-10">
          Applicants
        </h1>

        <div className="space-y-6">

          {applications.map((app) => (

            <div
              key={app.id}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {app.applicant}
              </h2>

              <p className="mt-3 text-gray-400">
                Status:
                <span
                  className={`ml-2 ${
                    app.status === "Accepted"
                      ? "text-green-400"
                      : app.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {app.status}
                </span>
              </p>
                  <p className="mt-4 text-gray-300">
                    <span className="font-bold">
                      Proposal:
                    </span>
                    <br />
                    {app.proposal}
                  </p>

                  <p className="mt-3 text-gray-300">
                    <span className="font-bold">
                      Quote:
                    </span>
                    ₹{app.quote}
                  </p>

                  <p className="mt-2 text-gray-300">
                    <span className="font-bold">
                      Delivery Time:
                    </span>
                    {app.delivery_time}
                  </p>

                  <p className="mt-2 text-gray-300">
                    <span className="font-bold">
                      Portfolio:
                    </span>

                    <a
                      href={app.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 ml-2"
                    >
                      View Portfolio
                    </a>
                  </p>
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(
                      app.id,
                      "Accepted"
                    )
                  }
                  className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app.id,
                      "Rejected"
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                >
                  Reject
                </button>

              </div>

              <textarea
                placeholder="Feedback for applicant..."
                className="w-full bg-black border border-gray-700 rounded-xl p-3 mt-4"
                value={feedbacks[app.id] || app.feedback || ""}
                onChange={(e) =>
                  setFeedbacks({
                    ...feedbacks,
                    [app.id]: e.target.value
                  })
                }
              />

              <button
                onClick={() =>
                  saveFeedback(app.id)
                }
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                Save Feedback
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}