import Navbar from "../components/navbar"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "../api/api"

export default function PostGig() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Design")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [skills, setSkills] = useState("")

  const handleSubmit = async () => {

    try {
      const user = JSON.parse(localStorage.getItem("user"))
      await API.post("/gigs", {
        title,
        description,
        category,
        budget: Number(budget),
        user: user.name
      })

      alert("✅ Gig Posted Successfully!")

      navigate("/dashboard")

    } catch (error) {

      console.error(error)

      alert("❌ Failed to post gig")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-bold mb-3">
          Post a Gig
        </h1>

        <p className="text-gray-400 mb-10">
          Find talented students for your project.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          {/* Title */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Gig Title
            </label>

            <input
              type="text"
              placeholder="Need a Logo Designer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          {/* Category */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl p-4"
            >
              <option>Design</option>
              <option>Development</option>
              <option>Presentation</option>
              <option>Video Editing</option>
              <option>Tutoring</option>
            </select>

          </div>

          {/* Description */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Description
            </label>

            <textarea
              rows="6"
              placeholder="Describe your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          {/* Budget */}
          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Budget (₹)
            </label>

            <input
              type="number"
              placeholder="500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          {/* Skills */}
          <div className="mb-8">

            <label className="block mb-3 font-semibold">
              Required Skills
            </label>

            <input
              type="text"
              placeholder="React, Canva, Figma..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none focus:border-green-500"
            />

          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-xl hover:opacity-80 transition"
          >
            Post Gig
          </button>

        </div>

      </div>

    </div>
  )
}