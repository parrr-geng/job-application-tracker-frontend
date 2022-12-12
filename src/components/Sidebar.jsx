import { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 

function Sidebar(){
    const { user } = useContext(AuthContext);
    const userId = user._id;
    return(
        <div>
            <div>Hi {user.name}</div>
            <div>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </div>
            <div>
                <Link to={`/profile/${userId}`}>
                    My Applications
                </Link>
            </div>
            <div>
                <Link to={`/profile/${userId}`}>
                    Calendar
                </Link>
            </div>
            <div>
                <Link to={`/profile/${userId}`}>
                    My Profile
                </Link>
            </div>    
        </div>
    )
}

export default Sidebar