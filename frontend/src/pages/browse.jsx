import Navbar from "../components/navbar"
import GigCard from "../components/gigcard"
import { useEffect, useState } from "react"
import API from "../api/api"

export default function Browse() {

const [gigs, setGigs] = useState([])
const [search, setSearch] = useState("")

useEffect(() => {

const fetchGigs = async () => {

  try {

    const response = await API.get("/gigs")

    setGigs(response.data)

  }

  catch (error) {

    console.error(error)

  }

}

fetchGigs()


}, [])

const filteredGigs = gigs.filter(


(gig) =>
  gig.status === "Open" &&

(
  gig.title
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  gig.category
    .toLowerCase()
    .includes(search.toLowerCase())

)
)

return (


<div className="min-h-screen bg-black text-white">

  <Navbar />

  <div className="max-w-7xl mx-auto px-8 py-16">

    <div className="flex items-center justify-between mb-12 flex-wrap gap-5">

      <div>

        <h1 className="text-5xl font-bold mb-4">
          Browse Gigs
        </h1>

        <p className="text-gray-400 text-lg">
          Discover freelance opportunities in your campus community.
        </p>

      </div>

    </div>

    <div className="mb-10">

      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-gray-900
          border
          border-gray-700
          rounded-xl
          p-4
          outline-none
          focus:border-green-500
          transition
        "
      />

    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {filteredGigs.length > 0 ? (

        filteredGigs.map((gig) => (

          <GigCard
            key={gig.id}
            gig={gig}
          />

        ))

      ) : (

        <div className="col-span-3 text-center py-20">

          <h2 className="text-3xl font-bold text-gray-500">
            No Gigs Found
          </h2>

          <p className="text-gray-600 mt-3">
            Try a different search term.
          </p>

        </div>

      )}

    </div>

  </div>

</div>


)

}
