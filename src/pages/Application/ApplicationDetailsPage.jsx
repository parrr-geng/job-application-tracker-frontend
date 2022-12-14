import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ApplicationDetailsPage(props){
    const { applicationId } = props;
    const [oneApplication, setOneApplication] = useState({});
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${baseURL}/api/applications/${applicationId}`)
        .then(response => setOneApplication(response.data))
        .catch(err => console.log(err))
    }, [applicationId])


    const handleChange = e => {
        const reqBody = {status: e.target.value};
    
        axios.put(`${baseURL}/api/applications/${applicationId}/edit`, reqBody)
        .then(response => {
            navigate("/dashboard");
            window.location.reload();

        })
        .catch(error => console.log(error));
    }
    

    const deleteApplication = () => {
        axios.delete(`${baseURL}/api/applications/${applicationId}/delete`)
        .then(()=>{
            navigate("/dashboard")
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="p-4">
            <div>
                <h6>{oneApplication.jobTitle}</h6>

                <select className="d-inline" onChange={handleChange}>
                    <option value="" disabled selected hidden>{oneApplication.status}</option>
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="In Process">In Process</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                </select>
                <hr />
                <h6>Notes</h6>
                <p>{oneApplication.notes}</p>
                <hr />
                <h6>Cover Letter</h6>
                <p>{oneApplication.coverLetter}</p>
            </div>
            <div>
                <Link to={`/applications/${oneApplication._id}/edit`}><Button variant="dark">Edit</Button></Link>
                <Button variant="dark" className="ms-2" onClick={()=>{deleteApplication(oneApplication._id)}}>Delete</Button>
            </div>
        </div>

    )
}

export default ApplicationDetailsPage;