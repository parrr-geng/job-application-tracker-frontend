import axios from "axios";
import {useState, useContext} from "react";
import {AuthContext} from "../../context/auth.context";
import {useNavigate} from "react-router-dom";

function CreateNewJobPage(){
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [recruiter, setRecruiter] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;
     
    const handleSubmit = e => {
        e.preventDefault();

        const reqBody = {title, company, location, jobType, recruiter, description};

        axios.post(`${baseURL}/api/${userId}/job/create`, reqBody)
        .then(response => {
            navigate("/dashboard");

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
            <form onSubmit={handleSubmit}>
                <label>Title</label><br />
                <input type="text" name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} required/>
                <br />
                <label>Company</label><br />
                <input type="text" name="company" placeholder="company" onChange={e=>setCompany(e.target.value)} required/>
                <br />
                <label>Location</label><br />
                <input type="text" name="location" placeholder="location" onChange={e=>setLocation(e.target.value)} required/>
                <br />
                <label>Job Type</label><br />
                <select name="jobType" onChange={e=>setJobType(e.target.value)} required>
                    <option>Select a job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                <br />
                <label>Recruiter</label><br />
                <input type="text" name="recruiter" placeholder="recruiter" onChange={e=>setRecruiter(e.target.value)} required/>
                <br />
                <label>Description</label><br />
                <textarea name="description" cols="30" rows="5" placeholder="description" onChange={e=>setDescription(e.target.value)}></textarea>
                <br /><br />
                <button type="submit">Add this Job</button>
            </form>
        </div>

    )
}

export default CreateNewJobPage;