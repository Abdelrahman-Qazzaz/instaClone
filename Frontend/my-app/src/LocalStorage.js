export async function localStorageGetItem(key /**string */, expirationTime) {
  if (localStorage.getItem(key)) {
    if (
      (await JSON.parse(localStorage.getItem(key)).data_date) >
      new Date().getTime() - expirationTime
    ) {
      const targetDataKey = Object.keys(
        JSON.parse(localStorage.getItem(key))
      )[0];
      console.log(JSON.parse(localStorage.getItem(key)));
      return await JSON.parse(localStorage.getItem(key))[targetDataKey];
    }
  }

  return null;
}

export async function localStorageSetItem(key /*string*/, data /*object*/) {
  console.log(data);

  data = Array.isArray(data) ? { data: data } : { data: [data] };

  localStorage.setItem(
    key,
    JSON.stringify({ ...data, data_date: new Date().getTime() })
  );
}
