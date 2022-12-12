import "./App.css";
import { Routes, Route } from "react-router-dom";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/User/ProfilePage";
import EditProfilePage from "./pages/User/EditProfilePage";

import CreateNewJobPage from "./pages/Job/CreateNewJobPage";
import AllMyJobsPage from "./pages/Job/AllMyJobsPage";
import JobDetailsPage from "./pages/Job/JobDetailsPage";
import EditJobPage from "./pages/Job/EditJobPage";

import CreateNewApplicationPage from "./pages/Application/CreateNewApplicationPage";
import ApplicationsPage from "./pages/Application/ApplicationsPage";
import ApplicationDetailsPage from "./pages/Application/ApplicationDetailsPage";
import EditApplicationPage from "./pages/Application/EditApplicationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

        <Route path="/dashboard" element={<IsPrivate> <DashboardPage /> </IsPrivate>} />
        <Route path="/:userId/profile/edit" element={<IsPrivate> <EditProfilePage/> </IsPrivate>} />

        <Route path="/:userId/jobs" element={<IsPrivate> <AllMyJobsPage /> </IsPrivate>} />
        <Route path="/:userId/job/create" element={<IsPrivate> <CreateNewJobPage /> </IsPrivate>} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/jobs/:jobId/edit" element={<EditJobPage />} />
        <Route path="/jobs/:jobId/apply" element={<CreateNewApplicationPage />} />

        <Route path="/:userId/applications/:status" element={<ApplicationsPage />} />
        <Route path="/applications/:applicationId" element={<ApplicationDetailsPage />} />
        <Route path="/applications/:applicationId/edit" element={<EditApplicationPage />} />

      </Routes>
    </div>
  );
}

export default App;
