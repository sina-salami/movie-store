import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';
import {colors} from '../utils';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.lavender,
          paddingHorizontal: '5%',
        },
        headerShown: false,
      }}
      initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
