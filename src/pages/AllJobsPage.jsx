import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"; 
import { Button, Card, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Sidebar from "../components/Sidebar";
import JobDetailsPage from "./Job/JobDetailsPage";
import SearchField from "../components/SearchField";

function AllJobsPage(){
    const [ jobs, setJobs ] = useState([]); 
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

    useEffect(()=>{
        axios.get(`${baseURL}/api/jobs`)
        .then(response => setJobs(response.data))
        .catch(error => console.log(error))
    }, [])

    async function copyToMyJobs(jobId){
        try {
            const likedJob = await axios.get(`${baseURL}/api/jobs/${jobId}`);
            const reqBody = {...likedJob.data};

            const copiedJob = await axios.post(`${baseURL}/api/${userId}/job/create`, reqBody)
            if(copiedJob){
                { alert("successfully added to my own job list.") }
            }      
        } catch (error) {
            console.log(error);
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [popupJobId, setPopupJobId] = useState("");

    const [query, setQuery] = useState("");
    let otherUsersJobs = jobs.filter( job => job.createdBy !== user._id );
    let displayedJobs = [];
    if ( query === "" ) {
        displayedJobs = [...otherUsersJobs];
    } else {
        displayedJobs = otherUsersJobs.filter( job => 
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase()) || 
            job.description.toLowerCase().includes(query.toLowerCase())
        )
    }
     
    return(
        <div className="row">
            {user && (
                <div className="col">
                    <Sidebar />
                </div>
            )}
            <div className="col-10">
            <h5 className="m-4">Jobposts Collected and Shared by Others</h5>
            <div className="pe-4">
                <SearchField setQuery={setQuery} />
            </div>
            <div className="p-4 d-flex flex-row flex-wrap row">
                {
                    displayedJobs   
                    .map(job => (
                        <Card className="mb-3 me-3 col-2" style={{width:"30vw"}}>
                            <div className="d-flex flex-row justify-content-between">
                                <div></div>
                                <div className="p-3" onClick={() => {copyToMyJobs(job._id)}}>
                                    {false ? <Icon.HeartFill /> : <Icon.Heart />}    
                                </div>       
                            </div>   
                            <Card.Body className="mb-3" key={job._id} onClick={()=>{handleShow(); setPopupJobId(job._id)}}>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Text>{job.company}</Card.Text>
                                <Card.Text style={{"fontSize":14}}>{job.location}, {job.jobType}</Card.Text>
                                <Card.Text>Shared By: {job.createdBy.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Job</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable>
                    <JobDetailsPage jobId={popupJobId} />
                </Modal.Body>
            </Modal>
            

            </div>
            

        </div>
    )
}

export default AllJobsPage;