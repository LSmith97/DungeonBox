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
import { introspectionFromSchema } from "graphql";

export default function Show() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [info, setInfo] = useState(null);
  const [creator, setCreator] = useState(null);
  const { user } = useAuth0();

  const navigate = useNavigate();

  const CLASS_INFO = gql`
    query ClassInfo {
      races {
        speed
        size
        ability_bonuses {
          ability_score {
            index
          }
          bonus
        }
        name
      }
      classes {
        hit_die
        name
      }
    }
  `;
  const { data, loading, error } = useQuery(CLASS_INFO);

  useEffect(() => {
    handleRequest();
  }, []);

  useEffect(() => {
    if (!loading && data && char) {
      let raceInfo = {};
      let classInfo = {};

      data.races.forEach((r) => {
        if (r.name === char.race) {
          raceInfo = { ...r };
        }
      });

      data.classes.forEach((c) => {
        if (c.name === char.class) {
          classInfo = { ...c };
        }
      });

      let abilityBonus = {};

      raceInfo.ability_bonuses.forEach((element) => {
        abilityBonus[element.ability_score.index] = element.bonus;
      });

      raceInfo.ability_bonuses = abilityBonus;

      setInfo({ raceInfo, classInfo });
    }
  }, [loading, data, char]);

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
          <h1>Character Details:</h1>
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
            <>
              <Stack spacing={1} direction="row">
                <h3>Hit Points:</h3>
                <p>
                  {info.classInfo.hit_die +
                    Math.floor((char.con - 10) / 2) * char.level +
                    Math.ceil((info.classInfo.hit_die + 1) / 2) *
                      (char.level - 1)}
                </p>
              </Stack>
              <Stack spacing={1} direction="row">
                <h3>Speed:</h3>
                <p>{info.raceInfo.speed}</p>
              </Stack>
              <Stack spacing={1} direction="row">
                <h3>Size:</h3>
                <p>{info.raceInfo.size.toLowerCase()}</p>
              </Stack>
            </>
          ) : (
            "Class/Race info loading..."
          )}
        </Stack>

        <div className="stats">
          <h1>Stats:</h1>
          <StatDisplay
            stat="Strength"
            value={char.str}
            asi={
              info && info.raceInfo.ability_bonuses.str
                ? info.raceInfo.ability_bonuses.str
                : 0
            }
          />
          <StatDisplay
            stat="Dexterity"
            value={char.dex}
            asi={
              info && info.raceInfo.ability_bonuses.dex
                ? info.raceInfo.ability_bonuses.dex
                : 0
            }
          />
          <StatDisplay
            stat="Constitution"
            value={char.con}
            asi={
              info && info.raceInfo.ability_bonuses.con
                ? info.raceInfo.ability_bonuses.con
                : 0
            }
          />
          <StatDisplay
            stat="Intelligence"
            value={char.int}
            asi={
              info && info.raceInfo.ability_bonuses.int
                ? info.raceInfo.ability_bonuses.int
                : 0
            }
          />
          <StatDisplay
            stat="Wisdom"
            value={char.wis}
            asi={
              info && info.raceInfo.ability_bonuses.wis
                ? info.raceInfo.ability_bonuses.wis
                : 0
            }
          />
          <StatDisplay
            stat="Charisma"
            value={char.cha}
            asi={
              info && info.raceInfo.ability_bonuses.cha
                ? info.raceInfo.ability_bonuses.cha
                : 0
            }
          />
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
