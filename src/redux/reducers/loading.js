const loading = (state = true, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.data.loading;
    default:
      return state;
  }
};
export default loading;
