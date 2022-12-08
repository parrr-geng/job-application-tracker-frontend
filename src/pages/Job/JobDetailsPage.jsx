import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";

function JobDetailsPage(){
    const [ oneJob, setOneJob ] = useState({});
    const jobId = useParams();

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

    useEffect(()=>{
        axios
        .get(`${baseURL}/api/jobs/${jobId}`)
        .then(response => {
            setOneJob(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error))
    }, [jobId])

    return(
        <div>
            <Navbar />
            <h2>Job Details</h2>
            <p>{oneJob.title}</p>
            <h4>{oneJob.company}</h4>
            <h4>{oneJob.location}</h4>
            <h4>{oneJob.jobType}</h4>
            <h4>{oneJob.recruiter}</h4>
            <p>{oneJob.description}</p>

        </div>
    )
}

export default JobDetailsPage;