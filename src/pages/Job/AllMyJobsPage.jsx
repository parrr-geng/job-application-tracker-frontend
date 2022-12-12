import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { AuthContext } from "../../context/auth.context"; 
import { Button, Card } from "react-bootstrap";
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
    
    const [open, setOpen] = useState(false);
    const [popupJobId, setPopupJobId] = useState("");
    const closeModal = () => setOpen(false);
     
    return(
        <>
            {
                jobs.map(job =>(
                    <Card className="my-2">
                        <Card.Body key={job._id} onClick={()=>{setOpen(o => !o); setPopupJobId(job._id)}}>
                            <h6>{job.title}</h6>
                            <p>{job.company}, {job.jobType}</p>
                        </Card.Body>          
                    </Card>
                ))
            }
            <Popup 
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <JobDetailsPage jobId={popupJobId} />
            </Popup>

        </>
    )
}

export default AllMyJobsPage;