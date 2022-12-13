import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import Popup from "reactjs-popup";
import ProfilePage from "../pages/User/ProfilePage";

function Sidebar(){
    const { user, logOutUser } = useContext(AuthContext);
    const userId = user._id;

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const contentStyle = { background: 'rgba(256,256,256,0.9)', overflow:"auto" };
    const overlayStyle = { background: 'rgba(0,0,0,0.2)' };
    const arrowStyle = { color: '#fff' };

    return(
        <div className="Sidebar">
            <div className="d-flex flex-column align-content-between">
                <div>
                    <div>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    <div>
                        <Link to={`/profile/${userId}`}>Calendar</Link>
                    </div>
                    <div onClick={()=>setOpen(o => !o)}>
                        Profile 
                    </div>

                    <br />
                    <br />
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/jobs">All Jobs</Link>
                    </div>
                </div>

                <div size="sm" onClick={logOutUser}> Logout </div> 

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