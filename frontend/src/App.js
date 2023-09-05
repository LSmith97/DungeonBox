import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import { CharacterContext } from "./data/CharacterContext";

function App() {
  const { Provider: CharacterData, Consumer } = CharacterContext;
  const [state, setState] = useState({});

  return (
    <div className="App">
      <CharacterData value={{ state, setState }}>
        <Header />
        <Main />
      </CharacterData>
    </div>
  );
}

export default App;
