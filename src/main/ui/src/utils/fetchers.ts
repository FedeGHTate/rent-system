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

  if (res.ok!) {
    throw new Error("Network error")
  }

  return res;
}

export const postFetcher = async (resource : String, data : Object) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      //Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  })

  if (res.ok!) {
    throw new Error("Network error")
  }

  return res;
}

export const patchFetcher = async (resource : String, data : Object) => {

  const res = await fetch(ENDPOINT + resource, {
    method: "PATCH",
    mode: "cors",
    headers: {
      Accept: "application/json",
      //Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  })

  if (res.ok!) {
    throw new Error("Network error")
  }

  return res;
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

  if (res.ok!) {
    throw new Error("Network error")
  }

  return res;
}