import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context"; 
import ApplicationDetailsPage from "./ApplicationDetailsPage";

function ApplicationsPage(props){
    const status = props.status;
    const searchKeyword = props.search;
    const [applications, setApplications] = useState([]);
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [popupApplicationId, setPopupApplicationId] = useState("");


    useEffect(()=>{
        axios.get(`${baseURL}/api/${userId}/applications/${status}`)
        .then(response => {
            const foundApplications = response.data;
            if(searchKeyword === null){setApplications(foundApplications)}
            else {
                const filteredApplications = [...foundApplications].filter(application=>{
                    application.jobTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    application.notes.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    application.coverLetter.toLowerCase().includes(searchKeyword.toLowerCase())
                })
                setApplications(filteredApplications);
            }
        })
        .catch(error => console.log(error))
    }, [status])


    return (
        <>
            {applications.map(application => (
                <Card className="m-2" key={application._id} onClick={()=>{handleShow(); setPopupApplicationId(application._id)}}>
                    <Card.Body>
                        <Card.Title style={{"fontSize":16}}>{application.jobTitle}</Card.Title>
                        <Card.Text style={{"fontSize":14}}>{application.notes}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Application</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable>
                    <ApplicationDetailsPage applicationId={popupApplicationId} />
                </Modal.Body>
            </Modal>      
        </>
    )
}

export default ApplicationsPage;