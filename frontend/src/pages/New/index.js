import { useState, useEffect } from "react";
import { MenuItem, TextField, Button} from "@mui/material";

import "./New.css"

export default function New() {
    const [isLoaded, setLoaded] = useState(false)
    const [options, setOptions] = useState({
        classes: [],
        races: []
    });

    useEffect(() => {fetchAPI()},[])

    async function fetchAPI(){
        const classData = await fetch("http://www.dnd5eapi.co/api/classes", {method:"get"})
            .then(response => response.json())
            .catch(error => console.log(error))

        const raceData = await fetch("http://www.dnd5eapi.co/api/races", {method:"get"})
            .then(response => response.json())
            .catch(error => console.log(error))

        setOptions({
            classes: classData.results,
            races: raceData.results
        });
        setLoaded(true);
    }

    function loaded(){

        const raceOptions = options.races.map((r) => (<MenuItem key={r.name} value={r.name}>
            {r.name}
        </MenuItem>))

        const classOptions = options.classes.map((c) => (<MenuItem key={c.name} value={c.name}>
            {c.name}
        </MenuItem>))

        return (
            <section>
              <h2>New Character</h2>
              <form className="new-char-form">
                    <TextField 
                        name="name"
                        label="Name" 
                        variant="filled"
                        helperText="Your character's name"
                    />
                    <TextField
                        name="level"
                        label="Level"
                        type="number"
                        defaultValue="1"
                        variant="filled"
                        helperText="Your character's level, 1-20"
                        inputProps={{ min: 1, max:20}}
                    />
                    <TextField
                        name="race"
                        select
                        label="Race" 
                        variant="filled"
                        helperText="Your character's lineage">
                        
                        {raceOptions}
                    </TextField>
                    <TextField
                        name="class"
                        select
                        label="Class" 
                        variant="filled"
                        helperText="Your primary class">
                        {classOptions}
                    </TextField>
                    <TextField
                        name="image"
                        label="Image Url"
                        variant="filled"
                        helperText="Your character's appearance, optional"
                    />
                    <h2>Stats</h2>
                    <p>Enter your character's base stats, before modifiers or racial bonuses. Minimum 6, Maximum 20</p>
                    <div>
                    <TextField 
                        name="str"
                        label="Strength" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Physical Prowess"
                    />
                    <TextField 
                        name="dex"
                        label="Dexterity" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Co-ordination and Reflexes"
                    />
                    <TextField 
                        name="con"
                        label="Constitution" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Physical Resilience"
                    />
                    <TextField 
                        name="int"
                        label="Intelligence" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Knowledge and Education"
                    />
                    <TextField 
                        name="wis"
                        label="Wisdom" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Experience and Awareness"
                    />
                    <TextField 
                        name="cha"
                        label="Charisma" 
                        variant="filled"
                        type="number"
                        defaultValue="10"
                        inputProps={{ min: 6, max:20}}
                        helperText="Charm and Force of will"
                    />
                    </div>
                    <Button type="submit" variant="contained">Submit</Button>
              </form>
            </section>
          );
    }

    function loading(){
        return <h1>Loading...</h1>
    }

  return isLoaded ? loaded() : loading();
}
