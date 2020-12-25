import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Button = ({title, onPress, ...props}) => {
  return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={onPress}>
      {props.loading ? (
        <ActivityIndicator color={props.titleColor || '#fff'} />
      ) : (
        <Text style={[styles.title, {color: props.titleColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    height: 48,
  },
  title: {
    fontSize: 18,
    padding: 10,
    alignSelf: 'center',
    color: '#fff',
  },
});

export default Button;
