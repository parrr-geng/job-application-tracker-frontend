import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/auth.context"; 

function CreateNewApplicationPage(){
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const { jobId } = useParams();
    const [ oneJob, setOneJob ] = useState({});
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios
        .get(`${baseURL}/api/jobs/${jobId}`)
        .then( response => setOneJob(response.data) )
        .catch( error => console.log(error) )
    }, [jobId])

    const jobTitle = oneJob.title;
    const [applicationStatus, setApplicationStatus] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [notes, setNotes] = useState("");
    const [dateApplied, setDateApplied] = useState();
    const [oneApplication, setOneApplication] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const reqBody = {job: jobId, jobTitle, status: applicationStatus, coverLetter, notes, dateApplied, applicant: userId};

        axios
        .post(`${baseURL}/api/${userId}/applications/create`, reqBody)
        .then(response => {
            navigate("/dashboard");

            setOneApplication(response.data);
            setApplicationStatus("");
            setCoverLetter("");
            setNotes("");
            setDateApplied();
        })
        .catch(error => console.log(error));
     
    }
    

    return(
        <div>  
            <div className="row">
                <div className="col bg-light">
                    <Sidebar />
                </div>
                <div className="col-11 CreateNewApplication">
                    <form onSubmit = {handleSubmit}>
                        <h5>Application for {jobTitle}</h5>
                        <br />

                        <label>Status</label><br />
                        <select onChange={e => setApplicationStatus(e.target.value)}>
                            <option>Choose a Status</option>
                            <option value="Wishlist">Wishlist</option>
                            <option value="Applied">Applied</option>
                            <option value="In Process">In Process</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                        </select>
                        <br />

                        <label>Cover Letter</label><br />
                        <textarea name="coverLetter" cols="30" rows="5" onChange={e => setCoverLetter(e.target.value)}></textarea>
                        <br />

                        <label>Notes</label><br />
                        <textarea name="notes" cols="30" rows="5" onChange={e=>setNotes(e.target.value)}></textarea>
                        <br />

                        <label>Date of Application</label><br />
                        <input name="dateApplied" type="date" onChange = {e => setDateApplied(e.target.value)} /> 
                        <br />

                        <button type="submit">Add this Application</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewApplicationPage;