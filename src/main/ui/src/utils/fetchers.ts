const ENDPOINT = `http://${process.env.NEXT_PUBLIC_BACKEND_INTERNAL_URL}`

export const getFetcher = async (resource : String) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      //Authorization: "Bearer " + token
    }
  })

  if (!res.ok) {
    throw new Error("Network error")
  }

  const data = await res.json()
  return data;
}

export const postFetcher = async (resource : String, obj : Object) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token
    },
    body: JSON.stringify(obj)
  })

  if (!res.ok) {
    throw new Error("Network error")
  }

  const data = await res.json()
  return data;
}

export const patchFetcher = async (resource : String, obj : Object) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "PATCH",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token
    },
    body: JSON.stringify(obj)
  })

  if (!res.ok) {
    throw new Error("Network error")
  }

  const data = await res.json()
  return data;
}

export const deleteFetcher = async (resource : String) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      //Authorization: "Bearer " + token
    }
  })

  if (!res.ok) {
    throw new Error("Network error")
  }

  return;
}