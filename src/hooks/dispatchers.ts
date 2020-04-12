import { IAction, ReducerActions } from "./ReducerTypes";

export const dispatchUser = (
  dispatch: React.Dispatch<IAction>,
  user: string
) => {
  return dispatch({ type: ReducerActions.register, payload: { user } });
};

export const dispatchAvatar = (
  dispatch: React.Dispatch<IAction>,
  avatarUri: string
) => {
  console.log("avatarUri");
  console.log(avatarUri);
  dispatch({
    type: ReducerActions.changeAvatar,
    payload: { avatar: avatarUri },
  });
};
