const BASE_URL = `${process.env.REACT_APP_BASE_URL}/`;

export async function index() {
  const res = await fetch(BASE_URL, { method: "GET" });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

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

export async function destroy(id) {
  const url = BASE_URL + id;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(id, formData) {
  const url = `${BASE_URL}/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid PUT Request");
  }
}