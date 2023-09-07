import CharacterForm from "../../components/CharacterForm";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { getOne, updateChar } from "../../utilities/characters-service";

export default function New() {
  const [editForm, setEditForm] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateChar(id, editForm);
      navigate(`/characters`);
    } catch (error) {
      console.log(error);
      navigate("/characters/new");
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  async function handleRequest() {
    try {
      const charData = await getOne(id);
      setEditForm(charData);
    } catch (error) {
      console.log(error);
      navigate(`/characters/${id}`);
    }
  }

  function loaded() {
    return (
      <CharacterForm
        handleSubmit={handleSubmit}
        form={editForm}
        setForm={setEditForm}
      />
    );
  }

  function loading() {
    return <h1>Loading...</h1>;
  }

  return editForm ? loaded() : loading();
}
