import CharacterList from "../../components/CharacterList";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getCharacters } from "../../utilities/characters-service";

export default function Characters(){

    const [chars, setChars] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        handleRequest()
    }, [])

    async function handleRequest(){
        try {
            const charData = await getCharacters();
            if (charData.length) {
                setChars(charData)
                setLoaded(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function loaded() {
        return (
            <CharacterList chars={chars} />
        )
    }

    function loading() {
        return (
            <h1>Loading...</h1>
        )
    }

    return(
        <div>
            {isLoaded ? loaded() : loading()}
        </div>
    )
}