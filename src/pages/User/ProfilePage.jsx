import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context"; 
import { Link } from "react-router-dom";

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

  return (
    <div>
      <h1>Profile page</h1>
      <h3>Name: <span>{oneUser.name}</span></h3>
      <h4>About</h4>
      <p>{oneUser.about}</p>
      <h4>Experience</h4>
      <p>{oneUser.experience}</p>
      <h4>Education</h4>
      <p>{oneUser.education}</p>
      <h4>Skills</h4>
      <p>{oneUser.skills}</p>

      <Link to={`/profile/${userId}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
