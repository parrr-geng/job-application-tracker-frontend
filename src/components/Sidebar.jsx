import "./Sidebar.css";
import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import Popup from "reactjs-popup";
import * as Icon from 'react-bootstrap-icons';
import ProfilePage from "../pages/User/ProfilePage";
import SearchField from "./SearchField";

function Sidebar(){
    const { user, logOutUser } = useContext(AuthContext);
    const userId = user._id;

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const contentStyle = { background: 'rgba(256,256,256,1)', overflow:"auto" };
    const overlayStyle = { background: 'rgba(0,0,0,0.4)' };
    const arrowStyle = { color: '#fff' };

    return(
        <div>
            <div className="Sidebar">
                <div className="mb-4">
                    <SearchField />
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <Link to="/" style={{"text-decoration":"none", color:"black"}}>
                            <Icon.House /> Home
                        </Link>
                    </div>

                    <div onClick={()=>setOpen(o => !o)}>
                        <Icon.PersonCircle /> Profile 
                    </div>

                    <div>
                        <Link style={{"text-decoration":"none", color:"black"}} to="/dashboard">
                            <Icon.Kanban /> Dashboard
                        </Link>
                    </div>

                    <div>
                        <Link to="/jobs" style={{"text-decoration":"none", color:"black"}}>
                            <Icon.HddStack /> All Jobs
                        </Link>
                    </div>

                    <div size="sm" onClick={logOutUser}> 
                        <Icon.DoorClosedFill /> Logout 
                    </div> 
                    <br />
                </div>
                <hr className="mt-auto"/>
            </div>

            <Popup 
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
                {...{contentStyle, overlayStyle, arrowStyle}}
            >
                <ProfilePage className="overflow-auto"/>
            </Popup>


        </div>
    )
}

export default Sidebar