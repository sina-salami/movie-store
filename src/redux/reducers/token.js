const token = (state = null, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.data.token;
    default:
      return state;
  }
};
export default token;
