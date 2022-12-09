import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import { Button } from "react-bootstrap";

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
    
    const deleteJob = (jobId) => {                 
        axios
          .delete(`${baseURL}/api/jobs/${jobId}/delete`)
          .then(() => {
            retrieveAllJobs();
          })
          .catch((err) => console.log(err));  
    };  
     
    return(
        <>
            {
                jobs.map(job =>(
                    <div>
                        <Link to={`/jobs/${job._id}`}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </Link>          
                        <Button onClick={() => {deleteJob(job._id)}}>
                            remove this one
                        </Button>
                    </div>
                ))
            }
        </>
    )
}

export default AllMyJobsPage;