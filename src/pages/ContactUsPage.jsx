import service from "../services/api.service";
import "./ContactUsPage.css";
import { useState } from "react";
import { Button, Form, FloatingLabel, FormGroup } from "react-bootstrap";


function ContactUsPage(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        const requestBody = {email, message};
        service
        .contactUs(requestBody)
        .then(response => {
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="ContactUsPage">
            <h5>Contact Us</h5>
            <br />
            <Form style={{"width":"80%"}} onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <FloatingLabel label="Your Email">
                        <Form.Control type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} required />
                    </FloatingLabel>
                </FormGroup>

                <FormGroup className="mb-5">
                    <FloatingLabel label="Your Message">
                        <Form.Control as="textarea" name="message" 
                        placeholder="Please write your message here..." 
                        onChange={e => setMessage(e.target.value)} 
                        style={{"height":"100px"}}
                        required />
                    </FloatingLabel>
                </FormGroup>

                <Button variant="dark" type="submit">Send</Button>
            </Form>
        </div>
    )
}

export default ContactUsPage;