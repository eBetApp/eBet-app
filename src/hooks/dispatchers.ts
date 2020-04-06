import { IAction, ReducerActions } from "./store";

export const dispatchUser = (
  dispatch: React.Dispatch<IAction>,
  user: string
) => {
  return dispatch({ type: ReducerActions.register, payload: { user } });
};
