const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users/`;

export async function detail(id) {
  const url = BASE_URL + id;
  const res = await fetch(url, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    console.log(res);
    throw new Error(res.statusText);
  }
}
