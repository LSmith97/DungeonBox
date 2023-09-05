const BASE_URL = `${process.env.REACT_APP_BASE_URL}/`;

export async function create(data) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }