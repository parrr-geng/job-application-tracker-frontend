import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context"; 

function ApplicationsPage(props){
    const status = props.status;
    const [applications, setApplications] = useState([]);
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;

    useEffect(()=>{
        axios.get(`${baseURL}/api/${userId}/applications/${status}`)
        .then(response => setApplications(response.data))
        .catch(error => console.log(error))
    }, [status])

    return (
        <>
            {applications.map(application => (
                <div key={application._id}>
                    <div>{application.jobTitle}</div>
                    <div>{application.coverLetter}</div>
                    <div>{application.notes}</div>
                </div>
            ))}             
        </>
    )
}

export default ApplicationsPage;