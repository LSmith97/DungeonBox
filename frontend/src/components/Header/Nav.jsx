import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
  const { user } = useAuth0();

  return (
    <nav className="Nav">
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link to="/characters">
        <Button variant="contained">View All</Button>
      </Link>
      {user ? (
        <>
          <Link to="/characters/new">
            <Button variant="contained">New Character</Button>
          </Link>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
