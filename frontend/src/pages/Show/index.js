import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getOne, deleteChar } from "../../utilities/characters-service";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, gql } from "@apollo/client";

import "./Show.css";
import StatDisplay from "./StatDisplay";
import Creator from "./Creator";

export default function Show() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [creator, setCreator] = useState(null);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth0();

  const GET_INFO = gql`
    query CharInfo($race: String, $class: String) {
      class(index: $class) {
        hit_die
      }
      race(index: $race) {
        size
        speed
        subraces {
          ability_bonuses {
            ability_score {
              name
            }
            bonus
          }
        }
        ability_bonuses {
          ability_score {
            index
          }
          bonus
        }
      }
    }
  `;

  let charRace = "";
  let charClass = "";
  if (char) {
    charRace = char.race;
    charClass = char.class;
  }

  const { loading, error, data } = useQuery(GET_INFO, {
    variables: { charClass, charRace },
  });

  useEffect(() => {
    handleRequest();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setInfo(data);
    }
  }, [loading, data]);

  async function handleRequest() {
    try {
      const charData = await getOne(id);
      setChar(charData);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const deletedResp = await deleteChar(id);
      navigate("/characters");
    } catch (error) {
      console.log(error);
      navigate(`/characters/${id}`);
    }
  }

  function loaded() {
    return (
      <div className="char-page">
        <h1>Character Details:</h1>

        <Creator id={char.owner} creator={creator} setCreator={setCreator} />

        <div className="char-image">
          <img
            alt={char.name}
            src={char.image ? char.image : "https://i.imgur.com/KT5izT5.png"}
          />
        </div>

        <Stack
          spacing={4}
          className="details"
          alignItems="flex-start"
          justifyContent="center"
        >
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
          {info ? (
          <Stack spacing={1} direction="row">
            <h3>Hit Points:</h3>
            <p>{info.class.hit_die + Math.ceil(info.class.hit_die / 2) * (char.level-1)}</p>
          </Stack>
          ) : ''}
        </Stack>

        <div className="stats">
          <h2>Stats:</h2>
          <StatDisplay stat="Strength" value={char.str} />
          <StatDisplay stat="Dexterity" value={char.dex} />
          <StatDisplay stat="Constitution" value={char.con} />
          <StatDisplay stat="Intelligence" value={char.int} />
          <StatDisplay stat="Wisdom" value={char.wis} />
          <StatDisplay stat="Charisma" value={char.cha} />
        </div>
        {user && creator && user.email === creator.email ? (
          <Stack
            className="show-buttons"
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={handleDelete} variant="contained">
              Delete Character
            </Button>
            <Link to={`/characters/${id}/edit`}>
              <Button variant="contained">Edit Character</Button>
            </Link>
          </Stack>
        ) : (
          ""
        )}
      </div>
    );
  }

  function waiting() {
    return <h1>Loading...</h1>;
  }

  return char ? loaded() : waiting();
}
