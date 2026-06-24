import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Profile from "./pages/profile"
import Dashboard from "./pages/dashboard"
import PostGig from "./pages/postgig"
import Login from "./pages/login"
import Register from "./pages/register"
import GigDetail from "./pages/gigdetail"
import Browse from "./pages/browse"
import ApplyProposal from "./pages/applygig"
import ProposalSuccess from "./pages/proposalsubmit"
import Applicants from "./pages/applicants"
import EditGig from "./pages/editgig"
import ProtectedRoute from "./components/protectedroutes"
import ForgetPassword from "./pages/ForgetPassword"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

        <Route path="/post-gig" element={ <ProtectedRoute> <PostGig /> </ProtectedRoute>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/gig/:id" element={<ProtectedRoute> <GigDetail /> </ProtectedRoute>} />

        <Route path="/browse" element={<Browse />} />

        <Route path="/apply/:id" element={ <ProtectedRoute> <ApplyProposal /></ProtectedRoute>} />

        <Route path="/proposal-success" element={<ProposalSuccess />} />

        <Route path="/applicants/:gigId" element={ <ProtectedRoute><Applicants /></ProtectedRoute>} />
        
        <Route path="/edit-gig/:id" element={ <ProtectedRoute><EditGig /> </ProtectedRoute>} />

        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>

  )
}
