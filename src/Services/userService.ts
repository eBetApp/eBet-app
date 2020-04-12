import { Platform } from "react-native";

// Expo imports
import * as ImagePicker from "expo-image-picker";

// Repositories import
import UserRepository from "../Repositories/userRepository";

// Services import
import { cameraPermissions } from "./devicePermissionsService";

import { User } from "../../ApiTypes/User.types";

const chooseImageFromGaleryAsync = async (
  user: User,
  token: string
): Promise<User | null> => {
  await cameraPermissions();

  try {
    const responseImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (responseImage.cancelled) return null;

    const responseFetch = await UserRepository.postPicture(
      _createFormData(user.uuid, responseImage),
      token
    );

    let oldImageUri = user.avatar;
    let userToUpdate = user;
    userToUpdate.avatar = responseFetch.user.avatar;

    if (oldImageUri != null && oldImageUri != "") {
      UserRepository.deletePicture(
        oldImageUri.replace(
          "https://touristapps3.s3.eu-west-3.amazonaws.com/", // TODO : stocker qqpart
          ""
        ),
        token
      );
    }
    return userToUpdate;
  } catch (err) {
    return null;
  }
};

const _createFormData = (uuid: any, photo: any) => {
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

export default { chooseImageFromGaleryAsync };
