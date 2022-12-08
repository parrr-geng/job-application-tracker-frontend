import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Stack direction="horizontal" gap={3}>
        <Link to="/">
          <Button> Home </Button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="ms-auto">
              <Button> Dashboard </Button>
            </Link>

            <Link to="/profile">
              <Button> Profile </Button>
              {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
            </Link>  

            <Button onClick={logOutUser}> Logout </Button> 
            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup" className="ms-auto">
              <Button> Sign Up </Button>{" "}
            </Link>

            <Link to="/login">
              <Button> Login </Button>{" "}
            </Link>
          </>
        )}

      </Stack>
    </nav>
  );
}

export default Navbar;
