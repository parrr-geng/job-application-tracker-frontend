import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { AuthContext } from "../context/auth.context"; 
import { Button, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Sidebar from "../components/Sidebar";
import JobDetailsPage from "./Job/JobDetailsPage";

function AllJobsPage(){
    const [jobs, setJobs] = useState([]); 
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const navigate = useNavigate();

    useEffect(()=>{
        retrieveAllJobs();
    }, [])

    const retrieveAllJobs = () => {
        axios.get(`${baseURL}/api/jobs`)
        .then(response => setJobs(response.data))
        .catch(error => console.log(error))
    }

    async function copyToMyJobs(jobId){
        try {
            const likedJob = await axios.get(`${baseURL}/api/jobs/${jobId}`);
            const reqBody = {...likedJob.data};
            setIsCopied(true);

            const notification = await axios.post(`${baseURL}/api/${userId}/job/create`, reqBody)
            if(notification){
                {/* alert("successfully added to my own job list.") */}
            }      
        } catch (error) {
            console.log(error);
        }
    }

    const [open, setOpen] = useState(false);
    const [popupJobId, setPopupJobId] = useState("");
    const closeModal = () => setOpen(false);
     
    return(
        <div className="row">
            {user && (
                <div className="col">
                    <Sidebar />
                </div>
            )}
            <div className="col-10">
            <h5 className="m-4">Job Market</h5>
            <div className="p-4 d-flex flex-row flex-wrap">
                {
                    jobs
                    .filter(job => job.createdBy !== user._id)    
                    .map(job =>(
                        <Card className="mb-3 me-3 col" style={{width:"30vw"}}>
                            <div className="d-flex flex-row justify-content-between">
                                <div></div>
                                <div className="p-3" onClick={() => copyToMyJobs(job._id)}>
                                    {isCopied ? <Icon.HeartFill /> : <Icon.Heart />}    
                                </div>       
                            </div>   
                            <Card.Body className="mb-3" key={job._id} onClick={()=>{setOpen(o => !o); setPopupJobId(job._id)}}>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Text>{job.company}</Card.Text>
                                <Card.Text style={{"fontSize":14}}>{job.location}, {job.jobType}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>

            <Popup 
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <JobDetailsPage jobId={popupJobId} />
            </Popup>
            

            </div>
            

        </div>
    )
}

export default AllJobsPage;