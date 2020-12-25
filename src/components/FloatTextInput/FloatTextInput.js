import React, {useCallback, useRef, useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';
import {colors} from '../../utils';

const FloatTextInput = ({onChangeText, value, ...props}) => {
  const place = new Animated.Value(0);
  const ref = useRef();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value !== '') {
      Animated.timing(place, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [place, value]);

  const bottom = place.interpolate({
    inputRange: [0, 1],
    outputRange: [13, 40],
  });

  const fontSize = place.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 12],
  });

  const onFocus = useCallback(() => {
    Animated.timing(place, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setFocused(true);
    }, 150);
  }, [place]);

  const onBlur = useCallback(() => {
    if (value === '') {
      Animated.timing(place, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    setTimeout(() => {
      setFocused(false);
    }, 150);
  }, [place, value]);

  return (
    <View style={[styles.container, props.style]}>
      <Animated.Text
        style={[styles.label, {bottom, fontSize}]}
        onPress={() => ref.current.focus()}>
        {props.label}
      </Animated.Text>
      <TextInput
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        style={[
          styles.input,
          {borderColor: focused ? colors.orange : colors.borderGray},
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        disabled={props.disabled}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    textAlign: 'left',
    fontSize: 19,
    height: 48,
    color: colors.jetBlack,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    backgroundColor: colors.lavender,
    color: colors.dimGray,
    position: 'absolute',
    left: 10,
    paddingHorizontal: 2,
    zIndex: 2,
  },
});

export default FloatTextInput;
