import { Routes, Route } from 'react-router-dom';
import Home from "../../pages/Home";
import Show from "../../pages/Show";
import Characters from "../../pages/Characters"
import New from "../../pages/New"

export default function Main(){
    return(
        <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/new" element={<New />} />
            <Route path="/characters/:id" element={<Show />} />
            </Routes>
        </main>
    )
}

