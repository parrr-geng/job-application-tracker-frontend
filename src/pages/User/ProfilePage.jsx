import axios from "axios";
import { useEffect, useContext, useState} from "react";
import { AuthContext } from "../../context/auth.context"; 

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
      <div className="px-4 py-2">
        <img className="mb-3" src={oneUser.profileImageURL ? oneUser.profileImageURL : "https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"} alt="profile image" style={{height:80, width:80, "border-radius":"50%"}} />
        <h3><span>{oneUser.name}</span></h3>
        <p>{oneUser.location}</p>
        <hr />
        <h5>About</h5>
        <p>{oneUser.about}</p>
        <hr />
        <h5>Experience</h5>
        <p className="ps-2">{oneUser.experience}</p>
        <hr />
        <h4>Education</h4>
        <p className="ps-2">{oneUser.education}</p>
        <hr />
        <h4>Skills</h4>
        <p className="ps-2">{oneUser.skills}</p>

        

      </div>
    </div>
    
  );
}

export default ProfilePage;
