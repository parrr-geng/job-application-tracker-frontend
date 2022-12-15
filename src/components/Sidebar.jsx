import "./Sidebar.css";
import { useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import { Modal, Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ProfilePage from "../pages/User/ProfilePage";
import service from "../services/api.service";


function Sidebar(){
    const { user, logOutUser } = useContext(AuthContext);
    const [ oneUser, setOneUser ] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        service
        .getOneUser(user._id)
        .then(foundUser => setOneUser(foundUser.data))
        .catch(error => console.log(error))
    }, [])

    return(
        <div>
            <div className="Sidebar ms-3 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column mb-3">
                        <img onClick={handleShow} className="mb-3 me-2" src={oneUser.profileImageURL ? oneUser.profileImageURL : "https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"} alt="profile image" style={{height:50, width:50, "borderRadius":"50%"}} />
                        <div>Hello {oneUser.name}!</div>
                    </div>

                    <div>
                        <Link style={{"textDecoration":"none", color:"black"}} to="/dashboard">
                            <Icon.Kanban className="me-2" /> Dashboard
                        </Link>
                    </div>

                    <div onClick={handleShow}>
                        <Icon.PersonCircle className="me-2" /> Profile 
                    </div>

                    <div>
                        <Link to="/jobs" style={{"textDecoration":"none", color:"black"}}>
                            <Icon.HddStack className="me-2" /> Explore
                        </Link>
                    </div>

                    <div>
                        <Link to="/" style={{"textDecoration":"none", color:"black"}}>
                            <Icon.House className="me-2"/> Home
                        </Link>
                    </div>

                </div>
                <div>
                    <hr className="mt-auto" />
                    <div onClick={logOutUser}> 
                        <Icon.DoorClosedFill className="me-2" /> Logout 
                    </div> 
                </div>
                
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