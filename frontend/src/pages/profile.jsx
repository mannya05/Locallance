import Navbar from "../components/navbar"

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* PROFILE HEADER */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">

          <img
            src="https://i.pravatar.cc/200"
            alt="profile"
            className="w-40 h-40 rounded-full border-4 border-green-500"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-bold mb-3">
              Manya 
            </h1>

            <p className="text-gray-400 text-lg mb-4">
              Full Stack Developer • UI Designer • Video Editor
            </p>

            <div className="flex gap-4 flex-wrap mb-5">

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                React
              </span>

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                FastAPI
              </span>

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                Tailwind
              </span>

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                Video Editing
              </span>

            </div>

            <div className="flex gap-8 text-lg">

              <div>
                ⭐ <span className="font-bold">4.9</span>
              </div>

              <div>
                Completed Gigs: <span className="font-bold">32</span>
              </div>

              <div>
                Earnings: <span className="font-bold text-green-400">₹12,500</span>
              </div>

            </div>

          </div>

        </div>

        {/* ABOUT SECTION */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mt-10">

          <h2 className="text-3xl font-bold mb-5">
            About
          </h2>

          <p className="text-gray-400 leading-8 text-lg">
            Passionate student freelancer helping startups and college communities
            with web development, presentations, UI design and editing work.
            Experienced in React, FastAPI and modern frontend technologies.
          </p>

        </div>

        {/* PORTFOLIO SECTION */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Portfolio
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gray-900 h-56 rounded-3xl border border-gray-800 flex items-center justify-center text-gray-500 text-xl">
              Project Preview
            </div>

            <div className="bg-gray-900 h-56 rounded-3xl border border-gray-800 flex items-center justify-center text-gray-500 text-xl">
              Project Preview
            </div>

            <div className="bg-gray-900 h-56 rounded-3xl border border-gray-800 flex items-center justify-center text-gray-500 text-xl">
              Project Preview
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}