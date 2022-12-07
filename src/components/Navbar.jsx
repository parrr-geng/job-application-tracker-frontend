import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Button, Stack } from 'react-bootstrap';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Stack direction="horizontal" gap={3}>
        <Link to="/">
          <Button variant="outline-primary">Home</Button>
        </Link>

        {isLoggedIn && (
        <>
          <span className="ms-auto">{user && user.name}</span>
          <Button variant="outline-primary" onClick={logOutUser}>Logout</Button>

          <Link to="/profile">
            <Button variant="outline-primary">Profile</Button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup" className="ms-auto">
            <Button variant="outline-primary">Sign Up</Button>{" "}
          </Link>

          <Link to="/login">
            {" "}
            <Button variant="outline-primary">Login</Button>{" "}
          </Link>
        </>
      )}

      </Stack>
      


    </nav>
  );
}

export default Navbar;
