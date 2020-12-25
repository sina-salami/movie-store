import React from 'react';
import {Button, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import {Home, CategoryList, MovieList} from '../screens';
import {colors} from '../utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.clear();
    const tokenAction = {
      type: 'REMOVE_TOKEN',
    };
    dispatch(tokenAction);
    // navigation.navigate('AuthStack');
  };

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.red,
        },
        headerTintColor: colors.jetBlack,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: {
          backgroundColor: colors.pink,
        },
      }}>
      <Stack.Screen
        name={'Home'}
        component={HomeStack}
        options={{
          headerLeft: () => (
            <Button title={'Logout'} onPress={logout} color={colors.jetBlack} />
          ),
        }}
      />
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
        activeTintColor: colors.red,
        inactiveTintColor: colors.dimGray,
        activeBackgroundColor: colors.jetBlack,
        inactiveBackgroundColor: colors.jetBlack,
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
