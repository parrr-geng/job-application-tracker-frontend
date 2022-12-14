import service from "../services/api.service";
import "./ContactUsPage.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

function ContactUsPage(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        const requestBody = {email, message};
        service
        .contactUs(requestBody)
        .then(response => {
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="ContactUsPage">
            <h5>Contact Us</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} required />
                <br /><br />
                <textarea cols="30" rows="5" name="message" placeholder="Please write your message here..." onChange={e => setMessage(e.target.value)} required >
                </textarea>
                <br /><br />
                <Button variant="dark" type="submit">Send</Button>
            </form>
        </div>
    )
}

export default ContactUsPage;