declare namespace ReducerTypes {
  interface IState {
    user?: string;
  }

  interface IAction {
    type: ReducerActions;
    payload: {
      user?: string;
    };
  }

  enum ReducerActions {
    register = "register",
    unregister = "unregister",
  }
}
