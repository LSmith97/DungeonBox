import { Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function CharCard({ char }) {
  return (
    <Link to={"/characters/" + char._id}>
      <Stack
        className="char-card"
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt={char.name}
          src={char.image}
          sx={{ width: 64, height: 64 }}
        />
        <h3>
          {char.name}: Level {char.level} {char.race} {char.class}
        </h3>
      </Stack>
    </Link>
  );
}
