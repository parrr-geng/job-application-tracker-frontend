import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import service from "../../services/api.service";

function JobDetailsPage(props){
    const { jobId } = props;
    const [ oneJob, setOneJob ] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        service
        .getJob(jobId)
        .then(response => setOneJob(response.data))
        .catch(error => console.log(error))
    }, [jobId])

    const handleDelete = (jobId) => {
        service
        .deleteJob(jobId)
        .then(() => navigate("/dashboard"))
        .catch((err) => console.log(err));          
    }

    return(
        <div className="p-2">
            <h6>Job Title:</h6>
            <h5>{oneJob.title}</h5>
            <h6>Company:</h6>
            <p>{oneJob.company}</p>
            <h6>Location:</h6>
            <p>{oneJob.location}</p>
            <h6>Job Type:</h6>
            <p>{oneJob.jobType}</p>
            <h6>Recruiter:</h6>
            <p>{oneJob.recruiter}</p>
            <h6>Description:</h6>
            <p>{oneJob.description}</p>
            <div className="d-flex flex-row">
                <Link className="me-2" to={`/jobs/${oneJob._id}/apply`}><Button>Apply</Button></Link>
                <Link className="me-2" to={`/jobs/${oneJob._id}/edit`}><Button>Edit</Button></Link>
                <Button className="me-2" onClick={()=>{handleDelete(oneJob._id)}}>Delete</Button>
                <Button className="me-2">Share</Button>
            </div>

        </div>
    )
}

export default JobDetailsPage;