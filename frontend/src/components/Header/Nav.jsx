import { Link } from "react-router-dom";

export default function Nav(){
    return (
        <nav className="Nav">
            <Link to="/">
                    Home
            </Link>
            <Link to="/characters">
                View All
            </Link>
            <Link to="/characters/new">
                New Character
            </Link>
        </nav>
    )
}