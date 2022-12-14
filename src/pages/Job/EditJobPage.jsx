import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, FloatingLabel, FormGroup } from "react-bootstrap";
import service from "../../services/api.service";
import Sidebar from "../../components/Sidebar";

function EditJobPage(){
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [oneJob, setOneJob] = useState({});
    useEffect(() => {
        axios
          .get(`${baseURL}/api/jobs/${jobId}`)
          .then((response) => {
            const thisJob = response.data;
            setOneJob(thisJob);
            })
          .catch(err => console.log(err));  
      }, [jobId]);

    const [title, setTitle] = useState(oneJob.title);
    const [company, setCompany] = useState(oneJob.company);
    const [location, setLocation] = useState(oneJob.location);
    const [jobType, setJobType] = useState(oneJob.jobType); 
    const [recruiter, setRecruiter] = useState(oneJob.recruiter);
    const [description, setDescription] = useState(oneJob.description);
    const [jobUrl, setJobUrl] = useState(oneJob.jobUrl);

    const handleSubmit = e => {
        e.preventDefault();
        const reqBody = {title, company, location, jobType, recruiter, description, jobUrl};

        axios
        .put(`${baseURL}/api/jobs/${jobId}/edit`, reqBody)
        .then(response => {
            navigate(`/dashboard`);
            window.location.reload();

            setTitle("");
            setCompany("");
            setLocation("");
            setJobType("");
            setRecruiter("");
            setDescription("");
            setJobUrl("");
        })
        .catch(err=>console.log(err))
    };

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
                                <FormGroup controlId="floatingInput1">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control type="text" name="title" placeholder={oneJob.title} onChange={e=>setTitle(e.target.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup controlId="floatingInput2">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control type="text" name="company" placeholder={oneJob.company} onChange={e=>setCompany(e.target.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup controlId="floatingInput3">
                                    <Form.Label>Recruiter</Form.Label>
                                    <Form.Control type="text" name="recruiter" placeholder={oneJob.recruiter} onChange={e=>setRecruiter(e.target.value)} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="g-2 mb-3">
                            <Col md>
                                <FormGroup controlId="floatingInput4" label="Location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" name="location" placeholder={oneJob.location} onChange={e=>setLocation(e.target.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup controlId="floatingSelectGrid">
                                    <Form.Label>Job Type</Form.Label>
                                    <Form.Select onChange={e=>setJobType(e.target.value)}>
                                        <option>Select a job type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Col className="mb-3">
                            <FormGroup controlId="floatingTextarea">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder={oneJob.description} onChange={e=>setDescription(e.target.value)} style={{ height: '200px' }} />
                            </FormGroup>
                        </Col>

                        <Col className="mb-3">
                            <FormGroup>
                                <Form.Label>Original Jobpost</Form.Label>
                                <Form.Control type="url" name="description" placeholder={oneJob.jobUrl} onChange={e=>setJobUrl(e.target.value)}/>
                            </FormGroup>
                        </Col>

                        <Button variant="dark" type="submit">Save</Button>
                    </Form>
                </div>                
            </div>
        </div>
    )
}

export default EditJobPage;