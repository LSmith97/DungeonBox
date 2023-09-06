import { createCharacter } from "../../utilities/characters-service";
import CharacterForm from "../../components/CharacterForm";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function New() { 

    const [newForm, setNewForm] = useState({
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

    return(
        <CharacterForm handleSubmit={handleSubmit} form={newForm} setForm={setNewForm} />
    )
}
