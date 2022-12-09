import "./LandingPage.css";
import githubLogo from "../assets/githubLogo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function LandingPage(){
    return (
        <div className="LandingPage shadow">
            
            <div className="d-flex flex-row-reverse">
                <img className="border border-top-0 border-dark p-3 me-2" src={githubLogo} style={{ width: 60, height: 60}} alt="github logo" />   
            </div>

            <section className="header row my-5">
                <div className="col-sm-8 ps-4 ">
                    <h2 className="fs-1 fw-bold">One Tracker</h2>
                    <h2 className="fs-1 fw-bold">All Job Applications</h2>
                    <p>Collect, plan and track all your job applications in an easy way.</p>
                    
                    <Link to="/signup">
                        <Button className="my-4 px-5 py-2" variant="warning"> Try Free </Button>
                    </Link>
                    <Link to="/login">
                        <Button className="px-5 py-2 fw-bold" variant="white"> Log In </Button>
                    </Link>

                </div>
                <div className="col-sm-4">
                    <img src="" alt=""/>
                </div>
            </section>

            <footer className="grid-container">
                <div className="grid-item p-3 Link ">
                    <Link className="text-decoration-none text-dark">About us</Link>
                </div>
                <div className="grid-item p-3 Link ">
                    <Link className="text-decoration-none text-dark">How it works?</Link>
                </div>
                <div className="grid-item p-3 Link ">
                    <Link className="text-decoration-none text-dark">Pricing</Link>
                </div>
                <div className="p-3 Link ">
                    <Link className="text-decoration-none text-dark">Try Free</Link>
                </div>
            </footer>
            

            
        </div>
    )
}

export default LandingPage;