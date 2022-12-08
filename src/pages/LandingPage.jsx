import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LandingPage(){
    return (
        <div className="LandingPage">
            <Navbar />
            <div>
                <p>Intro text goes here</p>
            </div>
            <div>
                <p>Snippet 1 of dashboard goes in this section.</p>
            </div>
            <div>
                <p>Snippet 2 of dashboard goes in this section.</p>
            </div>
            <div>
                <p>Snippet 3 of dashboard goes in this section.</p>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage;