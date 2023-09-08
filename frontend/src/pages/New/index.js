import { createCharacter } from "../../utilities/characters-service";
import CharacterForm from "../../components/CharacterForm";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function New() {
  const { user } = useAuth0();

  const [newForm, setNewForm] = useState({
    owner: user,
    name: "",
    level: 1,
    race: "Human",
    class: "Fighter",
    image: "",
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createCharacter(newForm);
      navigate(`/characters`);
    } catch (error) {
      console.log(error);
      navigate("/characters/new");
    }
  }

  const navigate = useNavigate();

  if (user) {
    return (
      <CharacterForm
        handleSubmit={handleSubmit}
        form={newForm}
        setForm={setNewForm}
        title={"New Character"}
      />
    );
  } else {
    return <h1>Please Log in to create a character</h1>;
  }
}