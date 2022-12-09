import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditJobPage(){
    const [oneJob, setOneJob] = useState({});
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
            setOneJob(thisJob);
            console.log(thisJob);
            })
          .catch(err => console.log(err));  
      }, []);
    //console.log(oneJob);
    
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
    };

    const deleteJob = (jobId) => {                 
        axios
          .delete(`${baseURL}/api/jobs/${jobId}/delete`)
          .then(() => {
            navigate("/dashboard");
          })
          .catch((err) => console.log(err));  
    };

    return(
        <div>
            <h2>Edit this Job</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" placeholder={oneJob.title} onChange={e=>setTitle(e.target.value)} required/>

                <label>Company</label>
                <input type="text" name="company" placeholder={oneJob.company} onChange={e=>setCompany(e.target.value)} required/>

                <label>Location</label>
                <input type="text" name="location" placeholder={oneJob.location} onChange={e=>setLocation(e.target.value)} required/>

                <label>Job Type</label>
                <select name="jobType" onChange={e=>setJobType(e.target.value)} required>
                    <option>Select a job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Recruiter</label>
                <input type="text" name="recruiter" placeholder={oneJob.recruiter} onChange={e=>setRecruiter(e.target.value)} required/>

                <label>Description</label>
                <textarea name="description" cols="30" rows="5" placeholder={oneJob.description} onChange={e=>setDescription(e.target.value)}></textarea>

                <button type="submit">Save</button>
                <Button onClick={()=>{deleteJob(oneJob._id)}}>delete</Button>
            </form>
        </div>
    )
}

export default EditJobPage;