import React from "react";
import { StoreProvider } from "./src/hooks/store";
import MainView from "./src/screens/MainView";

import { User } from "./ApiTypes/User.types";
import Fetch from "./src/Repositories/userRepository";
export default function App() {
  const initUser: User = {
    uuid: "d3f0d4a0-2f5b-4e3a-840d-b2b83763c8bf",
    nickname: "bob31",
    email: "bob31@gmail.com",
    password: "123456",
  };
  const [user, setUser] = useState(initUser);
  const [avatar, setAvatar] = useState(initUser.avatar);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzZjBkNGEwLTJmNWItNGUzYS04NDBkLWIyYjgzNzYzYzhiZiIsIm5pY2tuYW1lIjoiYm9iMzEiLCJlbWFpbCI6ImJvYjMxYkBnbWFpbC5jb20iLCJpYXQiOjE1ODYxODM0OTJ9.xvHvcJkO3gKKBZ5yXPo_aJu7IIN06d9KHmJTcx3718c";

  const chooseImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    }).then((response) => {
      console.log("RESPONSE from app");
      console.log(response);
      // if (response.didCancel || response.customButton) {
      //   // Snack.warning('Édition annulée !',showSnack,dispatch);
      // } else if (response.error) {
      //   // Snack.danger('Erreur lors de l\'édition d\'image !',showSnack,dispatch);
      // } else {
      // let updatedUser = currentUser;

      Fetch.postPicture(createFormData(user.uuid, response), token).then(
        (res) => {
          let userToUpdate = user;
          userToUpdate.avatar = res.user.avatar;
          setUser(userToUpdate);
          setAvatar(userToUpdate.avatar);
        }
      );
      // .then((res) => {
      //   let oldImageUri = currentUser.picture;
      //   updatedUser.picture = res.imageUrl;
      //   dispatch({ type: "currentUser", define: updatedUser });
      //   try {
      //     Fetch.deletePicture(
      //       oldImageUri.replace(
      //         "https://touristapps3.s3.eu-west-3.amazonaws.com/",
      //         ""
      //       ),
      //       token
      //     );
      //   } catch (err) {
      //     Snack.danger(
      //       "Erreur lors de l'édition d'image !",
      //       showSnack,
      //       dispatch
      //     );
      //   }
      // });
      // }
    });
  };

  const createFormData = (uuid: any, photo: any) => {
    // Get the filename of the image
    const { uri } = photo;
    const name = uri.split("/").pop();

    // Get the type of the image
    const match = /\.(\w+)$/.exec(name);
    const type = match ? `image/${match[1]}` : `image`;

    // Create FormaData with image data
    const data = new FormData();
    data.append("uuid", uuid);
    data.append("file", {
      name,
      type,
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
    });
    return data;
  };

  return (
    <StoreProvider>
      <MainView />
    </StoreProvider>
  );
}
