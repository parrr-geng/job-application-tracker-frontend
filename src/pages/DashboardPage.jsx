import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 

import AllMyJobsPage from "../pages/Job/AllMyJobsPage";
import Sidebar from "../components/Sidebar";
import ApplicationsPage from "./Application/ApplicationsPage";
import SearchField from "../components/SearchField";


function DashboardPage(){
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [search, setSearch] = useState(null);

    const showWishlist = () =>{

    }



    return(
        <>
            <div className="row ">
                <div className="col bg-light">
                    <Sidebar /> 
                </div>
                <div className="col-10">
                    <SearchField setSearch = {setSearch} />
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
                            <AllMyJobsPage search={search}/>
                        </div>
                        <div className="col-2 bg-light">
                            <h5>Wishlist</h5>
                            <ApplicationsPage status={"Wishlist"} search={search}/>
                        </div>
                        <div className="col-2 bg-primary">
                            <h5>Applied</h5>
                            <ApplicationsPage status={"Applied"} search={search}/>
                        </div>
                        <div className="col-2 bg-danger">
                            <h5>In Process</h5>
                            <ApplicationsPage status={"In Process"} search={search}/>
                        </div>
                        <div className="col-2 bg-secondary">
                            <h5>Rejected</h5>
                            <ApplicationsPage status={"Rejected"} search={search}/>
                        </div>
                        <div className="col-2 bg-success">
                            <h5>Offer!</h5>
                            <ApplicationsPage status={"Offer"} search={search}/>
                        </div>

                    </div>


                    
                    
                </div>
            </div>
        </>
    )
}

export default DashboardPage;