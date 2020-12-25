import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {AuthLoading} from '../screens';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const MainNavigator = () => {
  const {token, loading} = useSelector((state) => state);
  if (loading) {
    return <AuthLoading />;
  }
  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
