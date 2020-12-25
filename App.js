import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import store from './src/redux/store/store';
import Navigation from './src/navigations';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
