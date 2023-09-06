import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Nav() {
  return (
    <nav className="Nav">
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link to="/characters">
        <Button variant="contained">View All</Button>
      </Link>
      <Link to="/characters/new">
        <Button variant="contained">New Character</Button>
      </Link>
    </nav>
  );
}
