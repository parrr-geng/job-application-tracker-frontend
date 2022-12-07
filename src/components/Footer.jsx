import githubLogo from "../assets/githubLogo.png";
import {Stack} from "react-bootstrap";

function Footer(){
    return(
        <Stack direction="horizontal" className="text-secondary">
            <div>
                <p>All Rights Reserved</p>
            </div>
            <div className="ms-auto">
                <img src={githubLogo} style={{ width: 50, height: 50}} alt="github logo" />   
            </div>
        </Stack>
    )
}

export default Footer