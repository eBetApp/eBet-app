const local = "http://78221d3b.ngrok.io/api/";

const postPicture = async (body: FormData, token) => {
  try {
    let response = await fetch(`${local}user/upload-avatar`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body,
    });
    return response.json();
  } catch (err) {
    console.log("ERROR on fetching picture", err);
  }
};

//   deletePicture: (fileKey, auth) => remove(`${local}user/deleteImage/${fileKey}`,auth),

export default { postPicture };
