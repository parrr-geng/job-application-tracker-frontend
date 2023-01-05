import "./LandingPage.css";
import githubLogo from "../assets/githubLogo.png";
import landingPageIllustration from "../assets/goalAchieved.jpeg";
import axios from "axios";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card} from "react-bootstrap";
import ContactUsPage from "./ContactUsPage";
import { AuthContext } from "../context/auth.context"; 

function LandingPage(){
    const { user } = useContext(AuthContext);

    const toggleDisplay = (divID) => {
        let x = document.getElementById(divID);
        x.style.display === "block" ? x.style.display = "none" : x.style.display = "block";
    }

    const [apiJobs, setApiJobs] = useState([]);
    useEffect(()=>{
        axios.get("https://devitjobs.us/api/jobsLight")
        .then(response=> setApiJobs(response.data))
        .catch(error=>console.log(error))
    }, []);

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <div className="LandingPage shadow-lg">
            
            <div className="d-flex flex-row-reverse justify-content-between">
                <a href="https://github.com/parrr-geng" target="blank"><img className="border border-top-0 border-dark p-3 me-2" src={githubLogo} style={{ width: 60, height: 60}} alt="github logo" /></a>
                <Link to="/" className="Logo"><h3 className="ms-4 p-3 fw-bold">JT</h3></Link>
            </div>

            <section className="header row my-5">
                <div className="col-sm-6 ps-4 ">
                    <h2 className="fs-1 fw-bold">One Tracker</h2>
                    <h2 className="fs-1 fw-bold">All Job Applications</h2>
                    <p>Document and track all your job applications in an easy way.</p>
                    
                    <Link to="/signup">
                        <Button className="my-4 px-5 py-2" variant="warning"> 
                        {user ? "Go to Dashboard" : "Try Free" } 
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button className="px-5 py-2 fw-bold" variant="white"> Log In </Button>
                    </Link>

                </div>
                <div className="col-sm-6">
                    <img src={landingPageIllustration} style={{width: "90%", height:"90%"}}alt="multitasking illustration by EleniDebo"/>
                    <p className="pe-5" style={{"text-align":"right", "color":"grey"}}>(Illustration by soonsoonlee)</p>
                </div>
            </section>

            <section id="Jobs">
                <div className="p-4">
                    <h2 className="mb-4">Jobs</h2>
                    <div className="d-flex flex-row flex-wrap">
                        {apiJobs.slice(0, 15).map(job=>(
                            <Card className="m-1 ApiJob">
                                <Card.Title className="m-2">
                                    {job.name} | {job.company}
                                </Card.Title>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="Howitworks">
                <div className="p-4">
                    <h2 className="mb-4">How It Works</h2>
                    <div className="row">
                        {/*
                        <iframe className="col-6" width="672" height="378" 
                            src="https://www.youtube.com/embed/oTahLEX3NXo" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                        >
                        </iframe>
                        <div className="col-1"></div>
                        */}

                        <div className="col-5">
                            <h4>Create, edit and tailor your own application</h4>
                            <h4>Share and track with all other job hunters</h4>
                        </div>
                    </div>
                </div>

            </section>

            <section id="Pricing">
                <div className="p-4">
                    <h2 className="mb-4">Pricing</h2>
                    <h5 className="mb-4">It's FREE.</h5>
                    <p>And it will ALWAYS be.</p>
                    <p>This site is currently at the development and testing stage.</p>
                    <p>Please use it for free and don't hesitate to share your valuable feedbacks with me!</p>
                </div>
            </section>

            <footer className="grid-container">
                <div className="grid-item p-3 Link" onClick={()=>toggleDisplay("Jobs")}>
                    <Link className="text-decoration-none text-dark">Jobs</Link>
                </div>
                <div className="grid-item p-3 Link" onClick={()=>toggleDisplay("Howitworks")}>
                    <Link className="text-decoration-none text-dark">How it works?</Link>
                </div>
                <div className="grid-item p-3 Link" onClick={()=>toggleDisplay("Pricing")}>
                    <Link className="text-decoration-none text-dark">Pricing</Link>
                </div>
                <div className="p-3 Link" onClick={()=>setOpen(o => !o)}>
                    <Link className="text-decoration-none text-dark">Contact Us</Link>
                </div>
            </footer>



            <Popup 
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <ContactUsPage />
            </Popup>
            

            
        </div>
    )
}

export default LandingPage;