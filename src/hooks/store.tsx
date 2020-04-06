import React, { createContext, useReducer, useContext } from "react";

const _initialState: ReducerTypes.IState = {
  user: "",
};

// REDUCER
const _reducer: React.Reducer<ReducerTypes.IState, ReducerTypes.IAction> = (
  state = _initialState,
  action
) => {
  switch (action.type) {
    case ReducerTypes.ReducerActions.register:
      console.log("REDUCER - user");
      return {
        ...state,
        user: action.payload.user,
      };
    case ReducerTypes.ReducerActions.unregister:
      return {
        ...state,
        user: "",
      };
    default:
      return state;
  }
};

// STORE
const _initContext: {
  state: ReducerTypes.IState;
  dispatch: React.Dispatch<ReducerTypes.IAction>;
} = {
  state: _initialState,
  dispatch: () => {},
};
const _storeContext = createContext(_initContext);

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(_reducer, _initialState);

  return (
    <_storeContext.Provider value={{ state, dispatch }}>
      {children}
    </_storeContext.Provider>
  );
};

export const useStore = () => useContext(_storeContext);
