import * as characterAPI from "./characters-api";

export async function getCharacters() {
  try {
    const data = await characterAPI.index();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createCharacter(data) {
  try {
    const newCharacter = await characterAPI.create(data);
    return newCharacter;
  } catch (err) {
    throw err;
  }
}

export async function getOne(id) {
  try {
    const foundChar = await characterAPI.detail(id);
    return foundChar;
  } catch (err) {
    throw err;
  }
}

export async function deleteChar(id) {
  try {
    const deletedChar = await characterAPI.destroy(id);
    return deletedChar;
  } catch (err) {
    throw err;
  }
}

export async function updateChar(id, data) {
  try {
    const updatedChar = await characterAPI.update(id, data);
    return updatedChar;
  } catch (err) {
    throw err;
  }
}
