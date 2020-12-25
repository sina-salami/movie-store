import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {Home, CategoryList, MovieList} from '../screens';
import {colors} from '../utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blueGreen,
        },
        headerTintColor: colors.darkGreen,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: {
          backgroundColor: colors.lavender,
        },
      }}>
      <Stack.Screen name={'Home'} component={HomeStack} />
      <Stack.Screen
        name={'Category'}
        component={MovieList}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.blueGreen,
        inactiveTintColor: colors.dimGray,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({focused, color}) => (
            <EntypoIcon
              name={'home'}
              size={25}
              style={styles.icon}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryList}
        options={{
          tabBarLabel: ({focused, color}) => (
            <EntypoIcon
              name={'list'}
              size={25}
              style={styles.icon}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 10,
  },
});

export default AppStack;
