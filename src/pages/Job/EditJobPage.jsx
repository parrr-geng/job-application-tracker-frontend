import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, FloatingLabel, FormGroup } from "react-bootstrap";
import service from "../../services/api.service";
import Sidebar from "../../components/Sidebar";

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

    const handleDelete = (jobId) => {
        service
        .deleteJob(jobId)
        .then(() => navigate("/dashboard"))
        .catch((err) => console.log(err));          
    }

    return(
        <div className="row">
            <div className="col">
                <Sidebar />
            </div>
            <div className="col-10 row p-4" style={{"textAlign":"left"}}>
                <div className="col-8">
                    <h5 className="mb-4">Edit Job Info</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3 mb-3">
                            <Col md>
                                <FloatingLabel controlId="floatingInput1" label="Title">
                                    <Form.Control type="text" name="title" placeholder={oneJob.title} onChange={e=>setTitle(e.target.value)} required />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInput2" label="Company">
                                    <Form.Control type="text" name="company" placeholder={oneJob.company} onChange={e=>setCompany(e.target.value)} required />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInput3" label="Recruiter">
                                    <Form.Control type="text" name="recruiter" placeholder={oneJob.recruiter} onChange={e=>setRecruiter(e.target.value)} required />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel controlId="floatingInput4" label="Location">
                                    <Form.Control type="text" name="location" placeholder={oneJob.location} onChange={e=>setLocation(e.target.value)} required />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingSelectGrid" label="Job Type">
                                    <Form.Select aria-label="Flating label select">
                                        <option>Select a job type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Col className="my-2">
                            <FloatingLabel controlId="floatingTextarea" label="Description">
                                <Form.Control as="textarea" name="description" placeholder={oneJob.description} onChange={e=>setDescription(e.target.value)} style={{ height: '200px' }} />
                            </FloatingLabel>
                        </Col>

                        <Button variant="dark" type="submit">Save</Button>
                    </Form>
                </div>                
            </div>
        </div>
    )
}

export default EditJobPage;