import Navbar from "../components/navbar"
import { Link, useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useState } from "react"
import API from "../api/api"

export default function ApplyProposal() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [proposal, setProposal] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("1 Day")
  const [quote, setQuote] = useState("")
  const [portfolio, setPortfolio] = useState("")

  const handleApply = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      )

      const response = await API.post(
        "/applications",
        {
          gig_id: Number(id),
          applicant: user.name,
          proposal,
          delivery_time: deliveryTime,
          quote: Number(quote),
          portfolio
        }
      )

      if (
        response.data.message ===
        "Already applied"
      ) {

        toast.success(
          "You have already applied for this gig!"
        )

        return

      }

      toast.success("Application Submitted Successfully!")

      navigate("/proposal-success")

    }

    catch (error) {

      console.error(error)

      toast.error("Failed to submit proposal")

    }

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-12">

        <Link
          to={`/gig/${id}`}
          className="text-gray-400 hover:text-green-400"
        >
          ← Back to Gig
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 mt-6">

          <h1 className="text-4xl font-bold mb-3">
            Apply for Gig
          </h1>

          <p className="text-gray-400 mb-8">
            Fill the details below and submit your proposal.
          </p>

          {/* Proposal */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Your Proposal
            </label>

            <textarea
              rows="5"
              value={proposal}
              onChange={(e) =>
                setProposal(e.target.value)
              }
              placeholder="Describe why you are the right person for this gig..."
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          {/* Delivery Time */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Delivery Time
            </label>

            <select
              value={deliveryTime}
              onChange={(e) =>
                setDeliveryTime(e.target.value)
              }
              className="w-full bg-black border border-gray-700 rounded-xl p-4"
            >
              <option>1 Day</option>
              <option>3 Days</option>
              <option>5 Days</option>
              <option>1 Week</option>
            </select>

          </div>

          {/* Quote */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Your Quote (₹)
            </label>

            <input
              type="number"
              value={quote}
              onChange={(e) =>
                setQuote(e.target.value)
              }
              placeholder="Enter your price"
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          {/* Portfolio */}
          <div className="mb-8">

            <label className="block mb-3 font-semibold">
              Portfolio Link
            </label>

            <input
              type="text"
              value={portfolio}
              onChange={(e) =>
                setPortfolio(e.target.value)
              }
              placeholder="https://yourportfolio.com"
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          <button
            onClick={handleApply}
            className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-xl hover:opacity-80 transition"
          >
            Submit Proposal
          </button>

        </div>

      </div>

    </div>

  )

}