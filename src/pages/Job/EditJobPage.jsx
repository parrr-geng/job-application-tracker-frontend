import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditJobPage(){
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState(""); 
    const [recruiter, setRecruiter] = useState("");
    const [description, setDescription] = useState("");

    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { jobId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${baseURL}/api/jobs/${jobId}`)
          .then((response) => {
            const thisJob = response.data;
            console.log(thisJob);

            setTitle(thisJob.title);
            setCompany(thisJob.company);
            setLocation(thisJob.location);
            setJobType(thisJob.jobType);
            setRecruiter(thisJob.recruiter);
            setDescription(thisJob.description);
            })
          .catch(err => console.log(err));  
      }, [jobId]);

    const handleSubmit = e => {
        e.preventDefault();
        const reqBody = {title, company, location, jobType, recruiter, description};

        axios
        .put(`${baseURL}/api/jobs/${jobId}/edit`, reqBody)
        .then(response => {
            navigate(`/jobs/${jobId}`);

            setTitle("");
            setCompany("");
            setLocation("");
            setJobType("");
            setRecruiter("");
            setDescription("")
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <h2>Edit this Job</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" placeholder={title} onChange={e=>setTitle(e.target.value)} required/>

                <label>Company</label>
                <input type="text" name="company" placeholder={company} onChange={e=>setCompany(e.target.value)} required/>

                <label>Location</label>
                <input type="text" name="location" placeholder={location} onChange={e=>setLocation(e.target.value)} required/>

                <label>Job Type</label>
                <select name="jobType" onChange={e=>setJobType(e.target.value)} required>
                    <option>Select a job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Recruiter</label>
                <input type="text" name="recruiter" placeholder={recruiter} onChange={e=>setRecruiter(e.target.value)} required/>

                <label>Description</label>
                <textarea name="description" cols="30" rows="5" placeholder={description} onChange={e=>setDescription(e.target.value)}></textarea>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditJobPage;