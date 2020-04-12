const local = "http://68653a5d.ngrok.io/api/";

const _CRUD = {
  delete: async (endPoint: string, token: string) => {
    try {
      let response = await fetch(`${local}${endPoint}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  },
  post: async (endPoint: string, body: FormData, token: string) => {
    try {
      let response = await fetch(`${local}${endPoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  },
};

const postPicture = async (body: FormData, token) =>
  _CRUD.post("user/upload-avatar", body, token);

const deletePicture = (fileKey: string, token: string) =>
  _CRUD.delete(`user/delete-avatar/${fileKey}`, token);

export default { postPicture, deletePicture };
