import { Link } from "react-router-dom";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Button, Avatar } from "@mui/material";

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
          <Stack
            className="nav-end"
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <h3>Signed in as:</h3>
            <Avatar
              alt={user.name}
              src={user.picture}
              sx={{ height: 30, width: 30 }}
            />
            <h3>{user.name}</h3>
          </Stack>
          <LogoutButton />
        </>
      ) : (
        <div className="nav-end">
          <LoginButton />
        </div>
      )}
    </nav>
  );
}
