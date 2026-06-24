import Navbar from "../components/navbar"
import GigCard from "../components/gigcard"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import API from "../api/api"

const heading = "Campus Freelancing Made Simple".split(" ")

const categories = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Content Writing",
  "Digital Marketing",
  "Data Science",
  "AI / Machine Learning",
  "Tutoring",
  "Photography",
  "Event Management",
  "Presentation Design",
  "Resume Building"
]


export default function Home() {
  const [search, setSearch] = useState("")
  const [gigs, setGigs] = useState([])

  useEffect(() => {

  const fetchGigs = async () => {

    try {

      const response = await API.get("/gigs")

      setGigs(response.data)

    } catch (error) {

      console.error(error)

    }

  }

  fetchGigs()

}, [])

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(search.toLowerCase()) ||
    gig.category.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="px-8 py-24 text-center relative">

        {/* Glow Effect */}
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-0 left-1/2 -translate-x-1/2"></div>

        {/* Animated Heading */}
        <div className="flex justify-center flex-wrap gap-4 text-6xl font-extrabold mb-8 relative z-10 leading-tight">

          {heading.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.25,
                duration: 0.6,
              }}
            >
              {word}
            </motion.span>
          ))}

        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-400 text-xl max-w-3xl mx-auto mb-12 relative z-10 leading-9"
        >
          Find designers, developers, editors, tutors and freelancers
          from your college or city.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center gap-5 mb-12 relative z-10"
        >

          <a href="#gigs">

          <button className="bg-green-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:opacity-80 transition">
            Find Talent
          </button>

          </a>

        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center relative z-10"
        >
          <div className="flex w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden focus-within:border-green-500 transition">

          <input
            type="text"
            placeholder="Search gigs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 rounded-2xl bg-gray-900 border border-gray-700 outline-none text-lg focus:border-green-500 transition"
          />
        <button className="bg-green-500 text-black px-8 font-bold hover:opacity-80 transition">
      Search
    </button>
    </div>
        </motion.div>

      </section>

      {/* GIG SECTION */}
      <section
  id="gigs"
  className="px-8 pb-24"
>

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Popular Gigs
          </h2>

          <a
            href="/browse"
            className="text-green-400 hover:underline"
            >
          View All
          
        </a>
        
        </div>

        {/* Animated Gig Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {filteredGigs.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
              }}
              viewport={{ once: true }}
            >
              <GigCard gig={gig} />
            </motion.div>
          ))}

        </div>

      </section>
         <footer className="border-t border-gray-800 py-8 text-center text-gray-500">

  <h3 className="text-lg font-bold text-green-400 mb-2">
    LocalLance
  </h3>

  <p>
    Connecting campus talent with opportunities 
  </p>

  <p className="mt-2 text-sm">
    © 2026 LocalLance • Built by Mannya
  </p>

</footer>

    </div>
    
  )
  
}
