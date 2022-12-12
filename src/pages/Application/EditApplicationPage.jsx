import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditApplicationPage(){
    const [oneApplication, setOneApplication] = useState({});

    const [applicationStatus, setApplicationStatus] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [notes, setNotes] = useState("");

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { applicationId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${baseURL}/api/applications/${applicationId}`)
          .then((response) => {
            const thisApplication = response.data;
            setOneApplication(thisApplication);
            })
          .catch(err => console.log(err));  
      }, [applicationId]);
    
    const handleSubmit = e => {
        e.preventDefault();
        const reqBody = {jobTitle: oneApplication.jobTitle, status: applicationStatus, coverLetter, notes, dateApplied};

        axios
        .put(`${baseURL}/api/applications/${applicationId}/edit`, reqBody)
        .then(response => {
            navigate(`/applications/${applicationId}`);

            setApplicationStatus("");
            setDateApplied("");
            setCoverLetter("");
            setNotes("");
        })
        .catch(err=>console.log(err))
    };


    return(
        <form onSubmit = {handleSubmit}>
            <h5>Edit your application for {oneApplication.jobTitle}</h5>

            <label>Status</label>
            <select onChange={e => setApplicationStatus(e.target.value)}>
                <option>Choose a status</option>
                <option value="Wishlist">Wishlist</option>
                <option value="Applied">Applied</option>
                <option value="In Process">In Process</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
            </select>

            <label>Cover Letter</label>
            <textarea name="coverLetter" cols="30" rows="5" 
            placeholder={oneApplication.coverLetter}
            onChange={e => setCoverLetter(e.target.value)}></textarea>

            <label>Notes</label>
            <textarea name="notes" cols="30" rows="5" 
            placeholder={oneApplication.notes}
            onChange={e => setNotes(e.target.value)}></textarea>

            <label>Date of Application</label>
            <input name="dateApplied" type="date" 
            onChange={e => setDateApplied(e.target.value)} /> 

            <button type="submit">Save</button>
        </form>
    )
}

export default EditApplicationPage;