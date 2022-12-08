import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 

function AllMyJobsPage(){
    const [jobs, setJobs] = useState([]); 
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

    useEffect(()=>{
        axios.get(`${baseURL}/api/${userId}/jobs`)
        .then(response=>setJobs(response.data))
        .catch(error=>console.log(error))
    }, [userId])
    
    return(
        <>
            {
                jobs.map(job =>(
                    <div>
                        <Link to={`/jobs/${job._id}`}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </Link>          
                    </div>
                ))
            }
        </>
    )
}

export default AllMyJobsPage;