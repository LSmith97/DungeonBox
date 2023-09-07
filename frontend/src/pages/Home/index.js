import "./Home.css"
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack className="home" spacing={1} alignItems="center" justifyContent="center">
      <h1>What is DungeonBox?</h1>
      <p>
        DungeonBox is a web-based application that allows you to create and
        manage characters from Dungeons & Dragons 5th edition, as well as to
        view other people's creations. To Get started, click the login button and sign in with your google account.
      </p>
      <h2>Creating a character:</h2>
      <p>
        To create a character, head over to the "New Character" page. Just fill in your character's details and click the submit button. Optionally, you can also include an image, so that everyone can see your character in their full glory.
      </p>
      <h2>Viewing characters:</h2>
      <p>
        To view your creations, or those made by other users, click the "View All" button. Here, you will see a list of every character submitted to DungeonBox. To view more details, click on a character card to view more information about your adventurer. On this page, you can also edit or delete your characters, if you're signed in.
      </p>
    </Stack>
  );
}
