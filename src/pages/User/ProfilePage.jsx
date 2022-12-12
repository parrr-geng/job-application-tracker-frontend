import axios from "axios";
import { useEffect, useContext, useState} from "react";
import { AuthContext } from "../../context/auth.context"; 
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import Navbar from "../../components/Navbar";
import EditProfilePage from "./EditProfilePage";
import Sidebar from "../../components/Sidebar";

function ProfilePage() {
  const [ oneUser, setOneUser ] = useState({});
  const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const userId = user._id;

  useEffect(() => {
    axios.get(`${baseURL}/api/profile/${userId}`)
    .then(response => setOneUser(response.data))
    .catch(error => console.log(error));
  }, [userId])

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const contentStyle = { background: 'rgba(256,256,256,0.9)', overflow:"auto" };
  const overlayStyle = { background: 'rgba(182,249,255,0.2)' };
  const arrowStyle = { color: '#fff' };


  return (
    <div>
   
      <div>
        <h2>Profile page</h2>
        <h3>Name: <span>{oneUser.name}</span></h3>
        <h4>Location</h4>
        <p>{oneUser.location}</p>
        <h4>About</h4>
        <p>{oneUser.about}</p>
        <h4>Experience</h4>
        <p>{oneUser.experience}</p>
        <h4>Education</h4>
        <p>{oneUser.education}</p>
        <h4>Skills</h4>
        <p>{oneUser.skills}</p>

        <Link to={`/${oneUser._id}/profile/edit`}>Edit</Link>

      </div>
    </div>
    
  );
}

export default ProfilePage;
