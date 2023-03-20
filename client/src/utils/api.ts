
export const fetchCreate = (url: string, data: string) => {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    })
    .catch((error) => {
        console.error('Error', error);
    })
}
export const fetchPatch = (url: string, id: string, data: string) => {
    fetch(`${url}${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error', error);
      });
};
export const fetchPut = (url: string, id: string, data: string) => {
    fetch(`${url}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };