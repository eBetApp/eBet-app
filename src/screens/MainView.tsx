import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// Types imports
import { User } from "../../ApiTypes/User.types";

// Redux import
import { useStore } from "../hooks/store";
import { dispatchAvatar } from "../hooks/dispatchers";

// Services import
import userService from "../Services/userService";

export default function MainView() {
  const { state, dispatch } = useStore();

  const user: User = {
    uuid: "d3f0d4a0-2f5b-4e3a-840d-b2b83763c8bf",
    nickname: "bob31",
    email: "bob31@gmail.com",
    password: "123456",
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzZjBkNGEwLTJmNWItNGUzYS04NDBkLWIyYjgzNzYzYzhiZiIsIm5pY2tuYW1lIjoiYm9iMzEiLCJlbWFpbCI6ImJvYjMxYkBnbWFpbC5jb20iLCJpYXQiOjE1ODYxODM0OTJ9.xvHvcJkO3gKKBZ5yXPo_aJu7IIN06d9KHmJTcx3718c";

  const chooseImage = async () => {
    try {
      const newImage = await userService.chooseImageFromGaleryAsync();
      if (newImage === null) return;

      // (Optimistic UI) Dispatch expected res before fetch API
      dispatchAvatar(dispatch, newImage.uri);

      const updatedUser = await userService.postImageAsync(
        user,
        token,
        newImage
      );

      // (Optimistic UI) Dispatch previous value on API error
      if (updatedUser === null) return dispatchAvatar(dispatch, user.avatar);
    } catch (err) {
      console.log(`Error on changing avatar: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chooseImage}>
        <Text>Press Here</Text>
      </TouchableOpacity>

      <Image style={styles.avatar} source={{ uri: state.avatar }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
  },
  touchable: {
    width: 130,
    height: 130,
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 90,
  },
});
