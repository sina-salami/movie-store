import React, {useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

const AuthLoading = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token;
    (async () => {
      token = await AsyncStorage.getItem('token');
      if (token) {
        const tokenAction = {
          type: 'SET_TOKEN',
          data: {token},
        };
        dispatch(tokenAction);
      }
      const loadingAction = {
        type: 'SET_LOADING',
        data: {loading: false},
      };
      dispatch(loadingAction);
    })();
  }, [dispatch, navigation]);

  return <Text>LOADING...</Text>;
};

export default AuthLoading;
