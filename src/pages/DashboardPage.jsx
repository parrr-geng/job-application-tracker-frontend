import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 

import AllMyJobsPage from "../pages/Job/AllMyJobsPage";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ApplicationsPage from "./Application/ApplicationsPage";


function DashboardPage(){
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const showWishlist = () =>{

    }

    return(
        <>
            <div className="row ">
                <div className="col bg-light">
                    <Sidebar /> 
                </div>
                <div className="col-10">
                    <div>
                        <button onClick={showWishlist}>WishList</button>
                        <button>Applied</button>
                        <button>In Process</button>
                        <button>Rejected</button>
                        <button>Offer</button>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <Link to={`/${userId}/job/create`}>
                                + Collect A New Job
                            </Link>
                            <AllMyJobsPage />
                        </div>
                        <div className="col-2 bg-light">
                            <h5>Wishlist</h5>
                            <ApplicationsPage status={"Wishlist"}/>
                        </div>
                        <div className="col-2 bg-primary">
                            <h5>Applied</h5>
                            <ApplicationsPage status={"Applied"}/>
                        </div>
                        <div className="col-2 bg-danger">
                            <h5>In Process</h5>
                            <ApplicationsPage status={"In Process"}/>
                        </div>
                        <div className="col-2 bg-secondary">
                            <h5>Rejected</h5>
                            <ApplicationsPage status={"Rejected"}/>
                        </div>
                        <div className="col-2 bg-success">
                            <h5>Offer!</h5>
                            <ApplicationsPage status={"Offer"}/>
                        </div>

                    </div>


                    
                    
                </div>
            </div>
        </>
    )
}

export default DashboardPage;