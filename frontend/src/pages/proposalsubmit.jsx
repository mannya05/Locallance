import Navbar from "../components/navbar"
import { Link } from "react-router-dom"

export default function ProposalSuccess() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 max-w-2xl w-full text-center">

          <div className="text-7xl mb-6">
            ✅
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Proposal Submitted!
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Your application has been sent to the client successfully.
            You can track its status from your dashboard.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">

            <Link
              to="/dashboard"
              className="bg-green-500 text-black px-8 py-4 rounded-2xl font-bold hover:opacity-80 transition"
            >
              Go To Dashboard
            </Link>

            <Link
              to="/browse"
              className="border border-gray-700 px-8 py-4 rounded-2xl font-bold hover:border-green-500 transition"
            >
              Browse More Gigs
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}