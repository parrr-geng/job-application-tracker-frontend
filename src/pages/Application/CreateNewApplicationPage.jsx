import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";
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
                <div className="col">
                    <Sidebar />
                </div>
                <div className="col-10 row p-4" style={{"textAlign":"left"}}>
                    <Form className="col-8" onSubmit = {handleSubmit}>
                        <h5 className="my-4">Application</h5>

                        <h5 className="mb-3">{jobTitle}</h5>

                        <Form.Select className="mb-3" onChange={e => setApplicationStatus(e.target.value)}>
                            <option>Choose a Status</option>
                            <option value="Wishlist">Wishlist</option>
                            <option value="Applied">Applied</option>
                            <option value="In Process">In Process</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                        </Form.Select>

                        <FormGroup className="mb-3">
                            <Form.Label>Cover Letter</Form.Label>
                            <Form.Control name="coverLetter" as="textarea"
                            style={{"height": 200 }} 
                            onChange={e => setCoverLetter(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control name="notes" as="textarea" 
                            style={{"height": 100 }} 
                            onChange={e=>setNotes(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Label>Applied At</Form.Label>
                            <Form.Control name="dateApplied" type="date"
                            onChange = {e => setDateApplied(e.target.value)} />
                        </FormGroup>

                        <Button variant="dark" type="submit">Add this Application</Button>
                    </Form>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewApplicationPage;