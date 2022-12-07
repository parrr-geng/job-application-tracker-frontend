import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";


import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={<IsPrivate> <DashboardPage /> </IsPrivate>}
        />

        <Route
          path="/profile"
          element={<IsPrivate> <ProfilePage /> </IsPrivate>}
        />

        <Route
          path="/signup"
          element={<IsAnon> <SignupPage /> </IsAnon>}
        />

        <Route
          path="/login"
          element={<IsAnon> <LoginPage /> </IsAnon>}
        />

      </Routes>
    </div>
  );
}

export default App;
