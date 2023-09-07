import { useState, useEffect } from "react";
import { getUser } from "../../utilities/users-service";
import { Avatar, Stack } from "@mui/material";

export default function Creator({ id, creator, setCreator }) {
  useEffect(() => {
    handleRequest();
  }, []);

  async function handleRequest() {
    try {
      const charData = await getUser(id);
      setCreator(charData);
    } catch (error) {
      console.log(error);
    }
  }

  function loaded() {
    return (
      <Stack
        className="creator-info"
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <h3>Created by:</h3>
        <Avatar
          alt={creator.name}
          src={creator.picture}
          sx={{ width: 42, height: 42 }}
        />
        <h3>{creator.name}</h3>
      </Stack>
    );
  }

  function loading() {
    return <h3>Loading user info...</h3>;
  }

  return creator ? loaded() : loading();
}
