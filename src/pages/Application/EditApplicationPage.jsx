import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

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
            navigate("/dashboard");

            setApplicationStatus("");
            setDateApplied("");
            setCoverLetter("");
            setNotes("");
        })
        .catch(err=>console.log(err))
    };


    return(
        <div className="row">
            <div className="col">
                <Sidebar />
            </div>
            <div className="col-10 row p-4" style={{"textAlign":"left"}}>
                <Form onSubmit = {handleSubmit}>
                    <h5 className="my-4">Edit Your Application</h5>
                    <h5 className="mb-3">{oneApplication.jobTitle}</h5>

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
                        placeholder={oneApplication.coverLetter}
                        onChange={e => setCoverLetter(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control name="notes" as="textarea" 
                        style={{"height": 100 }} 
                        placeholder={oneApplication.notes}
                        onChange={e=>setNotes(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label>Applied At</Form.Label>
                        <Form.Control name="dateApplied" type="date"
                        placeholder = {oneApplication.dateApplied}
                        onChange = {e => setDateApplied(e.target.value)} />
                    </FormGroup>


                    <Button variant="dark" type="submit">Save</Button>
                </Form>

            </div>
        </div>
       
    )
}

export default EditApplicationPage;