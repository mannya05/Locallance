import Navbar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import API from "../api/api"

export default function Applicants() {

  const { gigId } = useParams()

  const [applications, setApplications] = useState([])
  const [feedbacks, setFeedbacks] = useState({})
  const [rankedData, setRankedData] = useState([])
  const [isRanking, setIsRanking] = useState(false)
  const [gigDescription, setGigDescription] = useState("")

  useEffect(() => {
    fetchApplications()
    fetchGigDescription()
  }, [])

  const fetchGigDescription = async () => {
    try {
      const response = await API.get(`/gigs/${gigId}`)
      setGigDescription(response.data.description)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await API.get(`/gigs/${gigId}/applications`)
      setApplications(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRankApplicants = async () => {

    if (applications.length === 0) {
      toast.error("No applicants to rank!")
      return
    }

    setIsRanking(true)

    try {

      const payload = {
        gig_description: gigDescription,
        applicants: applications.map((a) => ({
          id: a.id,
          name: a.applicant,
          proposal: a.proposal,
          quote: a.quote
        }))
      }

      const response = await API.post(
        "/ai/rank-applicants",
        payload
      )

      setRankedData(response.data.ranked)

      toast.success(
        "Applicants ranked successfully!"
      )

    } catch (error) {
      console.error(error)
      toast.error("AI ranking failed!")
    } finally {
      setIsRanking(false)
    }
  }

  const getAIScore = (appId) => {
    return rankedData.find(
      (r) => r.id === appId
    )
  }

  const getScoreClass = (score) => {

    if (score >= 80)
      return "bg-green-900 border-green-600"

    if (score >= 60)
      return "bg-yellow-900 border-yellow-600"

    return "bg-red-900 border-red-600"
  }

  const sortedApplications =
    rankedData.length > 0
      ? [...applications].sort((a, b) => {

          const scoreA =
            getAIScore(a.id)?.score || 0

          const scoreB =
            getAIScore(b.id)?.score || 0

          return scoreB - scoreA
        })
      : applications

  const updateStatus = async (
    applicationId,
    status
  ) => {
    let feedbackText =
  feedbacks[applicationId] || ""

if (
  status === "Accepted" &&
  feedbackText === ""
) {

  feedbackText =
    "Congratulations! Your proposal has been accepted. You can now contact the client using the details provided in your dashboard."

}

if (
  status === "Rejected" &&
  feedbackText === ""
) {

  feedbackText =
    "Thank you for applying. Another applicant was selected for this project. We appreciate your interest and encourage you to apply for future opportunities."

}


    try {

      await API.put(
        `/applications/${applicationId}`,
        null,
        {
          params: {
            status,
            feedback:
              feedbackText
          }
        }
      )

      await fetchApplications()

      toast.success(
        `${status} Successfully!`
      )

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed to update status"
      )
    }
  }

  const saveFeedback = async (
    applicationId
  ) => {

    try {

      const application =
        applications.find(
          (app) =>
            app.id === applicationId
        )

      await API.put(
        `/applications/${applicationId}`,
        null,
        {
          params: {
            status:
              application.status,
            feedback:
              feedbacks[
                applicationId
              ] || ""
          }
        }
      )

      await fetchApplications()

      toast.success(
        "Feedback Saved!"
      )

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed to save feedback"
      )
    }
  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-12">

        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <h1 className="text-5xl font-bold">
            Applicants
          </h1>

          <button
            onClick={handleRankApplicants}
            disabled={isRanking}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition disabled:opacity-50"
          >
            {isRanking
              ? "Ranking..."
              : "🤖 Rank with AI"}
          </button>

        </div>

        {rankedData.length > 0 && (

          <>
            <div className="bg-purple-900 border border-purple-700 rounded-2xl p-4 mb-5 text-purple-200 text-sm">
              ✅ AI has ranked your applicants by relevance, proposal quality, and pricing.
            </div>

            <div className="bg-green-900 border border-green-700 rounded-2xl p-5 mb-8">

              <h2 className="text-xl font-bold mb-2">
                🏆 Recommended Hire
              </h2>

              <p className="font-semibold">
                {
                  applications.find(
                    a =>
                      a.id ===
                      rankedData[0]?.id
                  )?.applicant
                }
              </p>

              <p className="text-green-300 mt-2">
                {
                  rankedData[0]?.reason
                }
              </p>

            </div>
          </>
        )}

        <div className="space-y-6">

          {sortedApplications.map(
            (app, index) => {

              const aiScore =
                getAIScore(app.id)

              return (

                <div
                  key={app.id}
                  className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
                >

                  {rankedData.length > 0 &&
                    index === 0 && (

                    <div className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold mb-4 inline-block">
                      🏆 AI Recommended Candidate
                    </div>
                  )}

                  {aiScore && (

                    <div
                      className={`flex items-center gap-3 mb-4 border rounded-xl p-3 ${getScoreClass(aiScore.score)}`}
                    >

                      <span className="text-2xl font-bold">
                        🤖 {aiScore.score}/100
                      </span>

                      <span className="text-sm">
                        {aiScore.reason}
                      </span>

                    </div>
                  )}

                  <h2 className="text-2xl font-bold">
                    {app.applicant}
                  </h2>

                  <p className="mt-3 text-gray-400">

                    Status:

                    <span
                      className={`ml-2 ${
                        app.status ===
                        "Accepted"
                          ? "text-green-400"
                          : app.status ===
                            "Rejected"
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
                    </span>{" "}
                    ₹{app.quote}
                  </p>

                  <p className="mt-2 text-gray-300">
                    <span className="font-bold">
                      Delivery Time:
                    </span>{" "}
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

                  {app.status ===
                    "Pending" && (

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() => {

                            let proceed = true

                            if (
                              rankedData.length > 0 &&
                              rankedData[0]?.id !== app.id
                            ) {

                              proceed = window.confirm(
                                "⚠ AI recommended another candidate. Do you still want to hire this applicant?"
                              )

                            } else {

                              proceed = window.confirm(
                                "Are you sure you want to accept this applicant?"
                              )

                            }

                            if (proceed) {

                              updateStatus(
                                app.id,
                                "Accepted"
                              )

                            }

                          }}
                        className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
                      >
                        Accept
                      </button>

                      <button
                       onClick={() => {

                          const confirmReject = window.confirm(
                            "Are you sure you want to reject this applicant?"
                          )

                          if (confirmReject) {

                            updateStatus(
                              app.id,
                              "Rejected"
                            )

                          }

                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                      >
                        Reject
                      </button>

                    </div>
                  )}

                  <textarea
                    placeholder="Feedback for applicant..."
                    className="w-full bg-black border border-gray-700 rounded-xl p-3 mt-4"
                    value={
                      feedbacks[app.id] ||
                      app.feedback ||
                      ""
                    }
                    onChange={(e) =>
                      setFeedbacks({
                        ...feedbacks,
                        [app.id]:
                          e.target.value
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
              )
            }
          )}

        </div>

      </div>

    </div>
  )
}

