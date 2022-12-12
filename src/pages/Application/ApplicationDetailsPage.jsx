import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function ApplicationDetailsPage(){
    const { applicationId } = useParams();
    const [oneApplication, setOneApplication] = useState({});
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${baseURL}/api/applications/${applicationId}`)
        .then(response => setOneApplication(response.data))
        .catch(err => console.log(err))
    }, [applicationId])

    const deleteApplication = () => {
        axios.delete(`${baseURL}/api/applications/${applicationId}/delete`)
        .then(()=>{
            navigate("/dashboard")
        })
        .catch(error => console.log(error))
    }

    return(
        <div>
            <div>
                <h3>{oneApplication.jobTitle}</h3>
                <p>{oneApplication.status}</p>
                <p>{oneApplication.notes}</p>
                <p>{oneApplication.coverLetter}</p>
            </div>
            <Link to={`/applications/${oneApplication._id}/edit`}>Edit</Link>
            <button onClick={()=>{deleteApplication(oneApplication._id)}}>Delete</button>
        </div>

    )
}

export default ApplicationDetailsPage;