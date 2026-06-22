import { Link } from "react-router-dom"

export default function GigCard({ gig }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2>{gig.title}</h2>

      <Link to={`/gig/${gig.id}`}>
        CLICK ME
      </Link>
    </div>
  )
}