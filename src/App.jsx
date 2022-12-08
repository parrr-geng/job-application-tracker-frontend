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


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

        <Route path="/dashboard" element={<IsPrivate> <DashboardPage /> </IsPrivate>} />
        <Route path="/profile/:userId" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/profile/:userId/edit" element={<IsPrivate> <EditProfilePage /> </IsPrivate>} />

      </Routes>
    </div>
  );
}

export default App;
