import { useState, useEffect } from "react";
import { MenuItem, TextField, Button } from "@mui/material";
import "./CharacterForm.css";

export default function CharacterForm({ handleSubmit, form, setForm}) {
  const [isLoaded, setLoaded] = useState(false);
  const [options, setOptions] = useState({
    classes: [],
    races: [],
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    const classData = await fetch("http://www.dnd5eapi.co/api/classes", {
      method: "get",
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    const raceData = await fetch("http://www.dnd5eapi.co/api/races", {
      method: "get",
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    setOptions({
      classes: classData.results,
      races: raceData.results,
    });
    setLoaded(true);
  }

  function loaded() {
    const raceOptions = options.races.map((r) => (
      <MenuItem key={r.name} value={r.name}>
        {r.name}
      </MenuItem>
    ));

    const classOptions = options.classes.map((c) => (
      <MenuItem key={c.name} value={c.name}>
        {c.name}
      </MenuItem>
    ));

    const style = {  
        input: { background: 'white' },
        select: { background: 'white'},
        ".MuiFormHelperText-root": {color: 'white' },
        ".MuiSelect-select": { background: 'white'}

    }

    return (
      <section>
        
        <h2>New Character</h2>
        <form onSubmit={handleSubmit} className="new-char-form">
          <TextField
            name="name"
            label="Name"
            variant="filled"
            helperText="Your character's name"
            value={form.name}
            onChange={handleChange}
            sx={style}
          />
          <TextField
            name="level"
            label="Level"
            type="number"
            variant="filled"
            helperText="Your character's level, 1-20"
            inputProps={{ min: 1, max: 20 }}
            value={form.level}
            onChange={handleChange}
            sx={style}
          />
          <TextField
            name="race"
            select
            label="Race"
            variant="filled"
            helperText="Your character's lineage"
            value={form.race}
            onChange={handleChange}
            sx={style}
          >
            {raceOptions}
          </TextField>
          <TextField
            name="class"
            select
            label="Class"
            variant="filled"
            helperText="Your primary class"
            value={form.class}
            onChange={handleChange}
            sx={style}
          >
            {classOptions}
          </TextField>
          <TextField
            name="image"
            label="Image Url"
            variant="filled"
            helperText="Your character's appearance, optional"
            value={form.image}
            onChange={handleChange}
            sx={style}
          />
          <h2>Stats</h2>
          <p>
            Enter your character's base stats, before modifiers or racial
            bonuses. Minimum 6, Maximum 20
          </p>
          <div>
            <TextField
              name="str"
              label="Strength"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Physical Prowess"
              value={form.str}
              onChange={handleChange}
              sx={style}
            />
            <TextField
              name="dex"
              label="Dexterity"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Co-ordination and Reflexes"
              value={form.dex}
              onChange={handleChange}
              sx={style}
            />
            <TextField
              name="con"
              label="Constitution"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Physical Resilience"
              value={form.con}
              onChange={handleChange}
              sx={style}
            />
            <TextField
              name="int"
              label="Intelligence"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Knowledge and Education"
              value={form.int}
              onChange={handleChange}
              sx={style}
            />
            <TextField
              name="wis"
              label="Wisdom"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Experience and Awareness"
              value={form.wis}
              onChange={handleChange}
              sx={style}
            />
            <TextField
              name="cha"
              label="Charisma"
              variant="filled"
              type="number"
              inputProps={{ min: 6, max: 20 }}
              helperText="Charm and Force of will"
              value={form.cha}
              onChange={handleChange}
              sx={style}
            />
          </div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </section>
    );
  }

  function loading() {
    return <h1>Loading...</h1>;
  }

  return isLoaded ? loaded() : loading();
}
