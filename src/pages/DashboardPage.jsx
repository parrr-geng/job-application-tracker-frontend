import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 

import Navbar from "../components/Navbar";

function DashboardPage(){

    const { user } = useContext(AuthContext);
    const userId = user._id;

    return(
        <>
            <Navbar />
            <h2>Dashboard</h2>

            <Link to={`/profile/${userId}`}>
                <button>Profile</button>
            </Link>

        </>
    )
}

export default DashboardPage;