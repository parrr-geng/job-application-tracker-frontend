import "./Sidebar.css";
import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import { Modal, Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfilePage from "../pages/User/ProfilePage";
import SearchField from "./SearchField";

function Sidebar(){
    const { user, logOutUser } = useContext(AuthContext);
    const userId = user._id;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

                    <div onClick={handleShow}>
                        <Icon.PersonCircle /> Profile 
                    </div>

                    <div>
                        <Link style={{"text-decoration":"none", color:"black"}} to="/dashboard">
                            <Icon.Kanban /> Dashboard
                        </Link>
                    </div>

                    <div>
                        <Link to="/jobs" style={{"text-decoration":"none", color:"black"}}>
                            <Icon.HddStack /> Explore
                        </Link>
                    </div>

                    <div size="sm" onClick={logOutUser}> 
                        <Icon.DoorClosedFill /> Logout 
                    </div> 
                    <br />
                </div>
                <hr className="mt-auto"/>
            </div>

            <Modal     
            show={show} 
            onHide={handleClose}
            >
                <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfilePage/>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={`/${user._id}/profile/edit`}>
                        <Button variant="dark">
                        Edit
                        </Button>
                    </Link>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 
                <Popup
                    open={open}
                    closeOnDocumentClick
                    onClose={closeModal}
                    {...{contentStyle, overlayStyle, arrowStyle}}
                >
        
                    <ProfilePage className="overflow-auto"/>
                </Popup>
            */}
 

      



        </div>
    )
}

export default Sidebar