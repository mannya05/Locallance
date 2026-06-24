import Navbar from "../components/navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import API from "../api/api"

export default function EditGig() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [budget, setBudget] = useState("")
  const [status, setStatus] = useState("Open")

  useEffect(() => {

    const fetchGig = async () => {

      try {

        const response = await API.get(`/gigs/${id}`)

        const gig = response.data

        setTitle(gig.title)
        setDescription(gig.description)
        setCategory(gig.category)
        setBudget(gig.budget)
        setStatus(gig.status || "Open")

      } catch (error) {

        console.error(error)

      }

    }

    fetchGig()

  }, [id])

  const updateGig = async () => {

    try {
          const currentUser = JSON.parse(
            localStorage.getItem("user")
          )
      await API.put(`/gigs/${id}`, {
        title,
        description,
        category,
        budget: Number(budget),
        status,
        user: currentUser.name
      })

      toast.success("Gig updated successfully!")

      navigate("/dashboard")

    } catch (error) {

      console.error(error)

    }

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-bold mb-10">
          Edit Gig
        </h1>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Gig Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-black border border-gray-700 rounded-xl p-4"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Category
            </label>

                  <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full bg-black border border-gray-700 rounded-xl p-4"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>

                  ))}

                </select>
          </div>

          <div className="mb-6">

            <label className="block mb-3 font-semibold">
              Description
            </label>

            <textarea
              rows="6"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-black border border-gray-700 rounded-xl p-4"
            />

          </div>

          <div className="mb-8">

            <label className="block mb-3 font-semibold">
              Budget
            </label>

            <input
              type="number"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="w-full bg-black border border-gray-700 rounded-xl p-4"
            />

          </div>
              <div className="mb-8">
                <label className="block mb-3 font-semibold">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl p-4"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
          <button
            onClick={updateGig}
            className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-xl"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  )

}