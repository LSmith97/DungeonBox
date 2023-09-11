import { Stack } from "@mui/material";

export default function StatDisplay({ stat, value, asi }) {
  return (
    <Stack
      className="stat-display"
      spacing={0}
      justifyContent="center"
      alignItems="center"
    >
      <h3>{stat}:</h3>
      <div className="stat-bubble">
        <h3>
          {(value - 10 >= 0 ? "+" : "") + Math.floor((value - 10 + asi) / 2)}
        </h3>
        <p>{asi ? `${value} + ${asi}` : value}</p>
      </div>
    </Stack>
  );
}
