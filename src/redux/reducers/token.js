const token = (state = null, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.data.token;
    case 'REMOVE_TOKEN':
      return null;
    default:
      return state;
  }
};
export default token;
