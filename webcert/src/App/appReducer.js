const inititalState = {
  name: undefined
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "DEMO_NAME":
      return { ...state, name: action.name };
    default:
      return { ...state };
  }
};

export { inititalState };
export default appStateReducer;
