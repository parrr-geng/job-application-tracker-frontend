import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import { Button, Card, Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import JobDetailsPage from "./JobDetailsPage";

function AllMyJobsPage(){
    const [jobs, setJobs] = useState([]); 
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const navigate = useNavigate();

    useEffect(()=>{
        retrieveAllJobs();
    }, [userId])

    const retrieveAllJobs = () => {
        axios.get(`${baseURL}/api/${userId}/jobs`)
        .then(response=>setJobs(response.data))
        .catch(error=>console.log(error))
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [popupJobId, setPopupJobId] = useState("");
     
    return(
        <>
            {
                jobs.map(job =>(
                    <Card className="my-2">
                        <Card.Body key={job._id} onClick={()=>{handleShow(); setPopupJobId(job._id)}}>
                            <Card.Title style={{"fontSize":16}}>{job.title}</Card.Title>
                            <Card.Text style={{"fontSize":14}}>{job.company}, {job.jobType}</Card.Text>
                        </Card.Body>          
                    </Card>
                ))
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Job</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable>
                    <JobDetailsPage jobId={popupJobId} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AllMyJobsPage;