import { Stack } from "@mui/material"
import CharCard from "./CharCard"

import "./CharacterList.css"

export default function CharacterList({ chars }) {

    const charEles = chars.map((c) => (<CharCard char={c} />))

    return (
        <Stack className="char-list" spacing={2} justifyContent="center" alignItems="center">
            <h1>All Characters:</h1>
            {charEles}
        </Stack>
    )
    
}