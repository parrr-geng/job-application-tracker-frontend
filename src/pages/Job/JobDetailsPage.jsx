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
        .then(() => {
            navigate("/dashboard");
            window.location.reload();
        })
        .catch((err) => console.log(err));          
    }

    return(
        <div className="px-4 py-2">
            <h6 className="text-secondary">Job Title</h6>
            <h5 className="mb-3">{oneJob.title}</h5>

            <h6 className="text-secondary">Company</h6>
            <p className="mb-3">{oneJob.company}</p>

            <h6 className="text-secondary">Location</h6>
            <p className="mb-3">{oneJob.location}</p>

            <h6 className="text-secondary">Job Type</h6>
            <p className="mb-3">{oneJob.jobType}</p>

            <h6 className="text-secondary">Recruiter</h6>
            <p className="mb-3">{oneJob.recruiter}</p>

            <h6 className="text-secondary">Description</h6>
            <p className="mb-3">{oneJob.description}</p>

            <div className="mb-5" >
                <h6 className="text-secondary">Link</h6>
                <Link style={{"text-decoration":"none"}} to={oneJob.jobUrl}>Original Jobpost</Link>
            </div>
            
            <div className="d-flex flex-row mb-2">
                <Link className="me-2" to={`/jobs/${oneJob._id}/apply`}><Button variant="dark">Apply</Button></Link>
                <Link className="me-2" to={`/jobs/${oneJob._id}/edit`}><Button variant="dark">Edit</Button></Link>
                <Button variant="dark" className="me-2" onClick={()=>{handleDelete(oneJob._id)}}>Delete</Button>
                <Button variant="dark" className="me-2">Share</Button>
            </div>

        </div>
    )
}

export default JobDetailsPage;