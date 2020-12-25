import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, Switch, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {FloatTextInput, Button, ErrorText} from '../../components';
import {colors, sendRequest} from '../../utils';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keep, setKeep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = () => {
    setLoading(true);
    sendRequest('POST', '/user/auth-token', {username, password}, false)
      .then((res) => {
        if (res.status === 200) {
          if (keep) {
            (async () => {
              await AsyncStorage.setItem('token', res.body.token);
            })();
          }
          const action = {
            type: 'SET_TOKEN',
            data: {token: res.body.token},
          };
          dispatch(action);
        } else {
          setError(res.body);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.info}>Login to your account</Text>
      <FloatTextInput
        label={'Username'}
        value={username}
        onChangeText={(txt) => setUsername(txt)}
      />
      <FloatTextInput
        label={'Password'}
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        secureTextEntry
      />
      <Button
        title={'Login'}
        onPress={submit}
        style={styles.button}
        titleColor={colors.darkGreen}
        loading={loading}
      />
      <View style={styles.keepWrapper}>
        <Text style={styles.keepText}>Keep me signed in</Text>
        <Switch
          style={styles.switch}
          value={keep}
          onValueChange={(val) => setKeep(val)}
        />
      </View>

      {error && <ErrorText error={error} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 20,
    color: colors.darkGreen,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.yellow,
  },
  keepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  keepText: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default Login;
