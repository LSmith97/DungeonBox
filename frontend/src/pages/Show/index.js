import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { getOne, deleteChar } from "../../utilities/characters-service"
import { Button, Stack } from "@mui/material"

import "./Show.css"
import StatDisplay from "./StatDisplay"

export default function Show(){

    const {id} = useParams()
    const [char, setChar] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        handleRequest()
    }, [])

    async function handleRequest(){
        try {
            const charData = await getOne(id)
            setChar(charData)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete() {
        try {
            const deletedResp = await deleteChar(id)
            navigate('/characters')
        } catch (error) {
            console.log(error)
            navigate(`/characters/${id}`)
        }
    }

    function loaded() {
        return (
            <div className="char-page">
                <h1>Character Details:</h1>
                <div className="char-image">
                    <img alt={char.name} src={char.image ? char.image : "https://i.imgur.com/KT5izT5.png"}/> 
                </div>
                <Stack spacing={4} className="details" alignItems="flex-start" justifyContent="center">
                    <Stack spacing={1} direction="row">
                        <h3>Name:</h3>
                        <p>{char.name}</p>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>Level:</h3>
                        <p>{char.level}</p>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>Race:</h3>
                        <p>{char.race}</p>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>Class:</h3>
                        <p>{char.class}</p>
                    </Stack>
                </Stack>
                <div className="stats">
                    <h2>Stats:</h2>
                    <StatDisplay stat="Strength" value={char.str}/>
                    <StatDisplay stat="Dexterity" value={char.dex}/>
                    <StatDisplay stat="Constitution" value={char.con}/>
                    <StatDisplay stat="Intelligence" value={char.int}/>
                    <StatDisplay stat="Wisdom" value={char.wis}/>
                    <StatDisplay stat="Charisma" value={char.cha}/>
                </div>
                <Stack className="show-buttons" spacing={1} direction="row" alignItems="center" justifyContent="center"> 
                    <Button onClick={handleDelete} variant="contained">Delete Character</Button>
                </Stack>
                
            </div>
        )
    }

    function loading() {
        return (
            <h1>Loading...</h1>
        )
    }

    return char ? loaded() : loading()
}