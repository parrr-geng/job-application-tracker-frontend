import "./DashboardPage.css";
import { useContext, useState } from "react";

import { Card, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { AuthContext } from "../context/auth.context"; 

import AllMyJobsPage from "../pages/Job/AllMyJobsPage";
import Sidebar from "../components/Sidebar";
import ApplicationsPage from "./Application/ApplicationsPage";
import CreateNewJobPage from "./Job/CreateNewJobPage";
import SearchField from "../components/SearchField";


function DashboardPage(){
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [search, setSearch] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleDisplay = (divId) =>{
        const x = document.getElementById(divId);
        x.style.display === "none" ? x.style.display = "block" : x.style.display = "none";
    }

    return(
        <div className="DashboardPage">
            <div className="row">
                <div className="col">
                    <Sidebar />
                </div>
                <div className="col-10">                    
                    <div className="row p-3">
                        <div className="col-2" >
                            <h6 className="Category p-2">Job Posts</h6>
                            <Card className="text-decoration-none text-dark"
                            onClick={handleShow}
                            > + 
                            </Card>
                     
                            <AllMyJobsPage search={search} />
                        </div>
                        <div className="col">
                            <div className="my-4">
                                {/* <Badge pill className="mx-1" onClick={()=>toggleDisplay("Jobs")}>Jobs</Badge> */}
                                {"- - -"}
                                <Badge pill bg="dark" onClick={()=>toggleDisplay("Wishlist")}>WishList</Badge>
                                {"-"}
                                <Badge pill bg="dark" onClick={()=>toggleDisplay("Applied")}>Applied</Badge>
                                {"-"}
                                <Badge pill bg="dark" onClick={()=>toggleDisplay("InProcess")}>In Process</Badge>
                                {"-"}
                                <Badge pill bg="dark" onClick={()=>toggleDisplay("Rejected")}>Rejected</Badge>
                                {"-"}
                                <Badge pill bg="dark" onClick={()=>toggleDisplay("Offer")}>Offer</Badge>
                                {"- - -"}
                            </div>
                            <div className="row">
                                <div className="col" id="Wishlist">
                                    <h6 className="Category p-2">Wishlist</h6>
                                    <div className="Applications border border-dark rounded">
                                        <ApplicationsPage status={"Wishlist"} search={search}/>
                                    </div>
                                </div>
                                <div className="col" id="Applied">
                                    <h6 className="Category p-2">Applied</h6>
                                    <div className="Applications border border-dark rounded">
                                        <ApplicationsPage status={"Applied"} search={search}/>
                                    </div>
                                </div>
                                <div className="col" id="InProcess">
                                    <h6 className="Category p-2">In Process</h6>
                                    <div className="Applications border border-dark rounded">
                                        <ApplicationsPage status={"In Process"} search={search}/>
                                    </div>
                                </div>
                                <div className="col" id="Rejected">
                                    <h6 className="Category p-2">Rejected</h6>
                                    <div className="Applications border border-dark rounded">
                                        <ApplicationsPage status={"Rejected"} search={search}/>
                                    </div>
                                </div>
                                <div className="col" id="Offer">
                                    <h6 className="Category p-2">Offer!</h6>
                                    <div className="Applications border border-dark rounded">
                                        <ApplicationsPage status={"Offer"} search={search}/>
                                    </div> 
                                </div>

                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateNewJobPage />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashboardPage;