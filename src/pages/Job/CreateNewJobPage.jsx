import axios from "axios";
import {useState, useContext} from "react";
import {AuthContext} from "../../context/auth.context";
import {useNavigate} from "react-router-dom";
import {Form, Row, Col, Button} from "react-bootstrap";

function CreateNewJobPage(){
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [recruiter, setRecruiter] = useState("");
    const [description, setDescription] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [publicVisibility, setPublicVisibility] = useState(false);

    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;
     
    const handleSubmit = e => {
        e.preventDefault();

        const reqBody = {title, company, location, jobType, recruiter, description, jobUrl, publicVisibility};

        axios.post(`${baseURL}/api/${userId}/job/create`, reqBody)
        .then(response => {
            navigate("/dashboard");
            window.location.reload();
            
            setTitle("");
            setCompany("");
            setLocation("");
            setJobType("");
            setRecruiter("");
            setDescription("");
            setJobUrl("");
            setPublicVisibility(false);
            
        })
        .catch(err=>console.log(err))
    }
    
    return(
        <div className="px-4 py-2">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="JobFormTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Software Engineer / UX Designer / ..." onChange={e=>setTitle(e.target.value)} />
                </Form.Group>

                <Row>
                    <Col md>
                        <Form.Group className="mb-3" controlId="JobFormCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control name="company" type="text" placeholder="Apple / Netflix / ..." onChange={e=>setCompany(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" controlId="JobFormLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control name="location" type="text" placeholder="Berlin / London / Remote /..." onChange={e=>setLocation(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md>
                        <Form.Group className="mb-3" controlId="JobFormJobType">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Select name="jobType" onChange={e=>setJobType(e.target.value)}>
                                <option>Select a job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" controlId="JobFormRecruiter">
                            <Form.Label>Recruiter</Form.Label>
                            <Form.Control name="recruiter" type="text" placeholder="John Doe: johndoe@company.com" onChange={e=>setRecruiter(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="JobFormDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Requirement / Bebefits / Salary / ..."
                    onChange={e=>setDescription(e.target.value)}
                    style={{ height: '100px' }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="JobFormLink">
                    <Form.Label>Link</Form.Label>
                    <Form.Control name="jobUrl" type="url" placeholder="Link to the original job post" onChange={e => setJobUrl(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-5" controlId="JobFormPublic">
                    <Form.Check name="public" type="checkbox" label="Set the visibility to public" onChange={e => setPublicVisibility(e.target.checked)}/>
                </Form.Group>

                <Button variant="dark" type="submit">Add this Job</Button>
            </Form>
        </div>

    )
}

export default CreateNewJobPage;