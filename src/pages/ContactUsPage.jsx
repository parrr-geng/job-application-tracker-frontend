import "./ContactUsPage.css";

function ContactUsPage(){
    const handleSubmit = e => {
        
    }

    return(
        <div className="ContactUsPage">
            <h5>Contact Us</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" required />
                <br /><br />
                <textarea cols="30" rows="5" placeholder="Please write your message here...">
                </textarea>
                <br /><br />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ContactUsPage;