import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context"; 
import ApplicationDetailsPage from "./ApplicationDetailsPage";

function ApplicationsPage(props){
    const status = props.status;
    const searchKeyword = props.search;
    const [applications, setApplications] = useState([]);
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [open, setOpen] = useState(false);
    const [popupApplicationId, setPopupApplicationId] = useState("");
    const closeModal = () => setOpen(false);

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
                <Card className="m-2" key={application._id} onClick={()=>{setOpen(o => !o); setPopupApplicationId(application._id)}}>
                    <Card.Body>
                        <h5>{application.jobTitle}</h5>
                        <p>{application.status}</p>
                        <p>{application.notes}</p>
                    </Card.Body>
                </Card>
            ))}
            <Popup 
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <ApplicationDetailsPage applicationId={popupApplicationId} />
            </Popup>             
        </>
    )
}

export default ApplicationsPage;