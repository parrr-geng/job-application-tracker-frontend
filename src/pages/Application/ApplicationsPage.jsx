import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 

function ApplicationsPage(props){
    const status = props.status;
    const searchKeyword = props.search;
    const [applications, setApplications] = useState([]);
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;

    useEffect(()=>{
        axios.get(`${baseURL}/api/${userId}/applications/${status}`)
        .then(response => {
            const foundApplications = response.data;
            if(searchKeyword === null){setApplications(foundApplications)}
            else {
                const filteredApplications = [...foundApplications].filter(application=>{
                    application.jobTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    application.notes.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    application.coverLetter.toLowerCase().includes(searchKeyword.toLowerCase())
                })
                setApplications(filteredApplications);
            }
        })
        .catch(error => console.log(error))
    }, [status])

    return (
        <>
            {applications.map(application => (
                <Link to={`/applications/${application._id}`}>
                    <div key={application._id}>
                        <h5>Which Job?</h5>
                        <div>{application.jobTitle}</div>
                        <h5>Notes</h5>
                        <div>{application.notes}</div>
                    </div>
                </Link>
            ))}             
        </>
    )
}

export default ApplicationsPage;