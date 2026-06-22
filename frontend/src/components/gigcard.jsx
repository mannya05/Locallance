import { Link } from "react-router-dom"

export default function GigCard({ gig }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl shadow-lg hover:scale-105 hover:border-green-500 transition duration-300">

      <div className="flex items-center justify-between mb-4">

        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
          {gig.category}
        </span>

      </div>

      <h2 className="text-2xl font-bold mb-4">
        {gig.title}
      </h2>

      <p className="text-gray-400 mb-6">
        Posted by {gig.user}
      </p>

      <div className="flex items-center justify-between">

        <p className="text-2xl font-bold text-green-400">
          ₹{gig.budget}
        </p>

        <Link
          to={`/gig/${gig.id}`}
          className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold hover:opacity-80 transition"
        >
          View Gig
        </Link>

      </div>

    </div>
  )
}