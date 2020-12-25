import React, {useCallback, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors} from '../../utils';

const SearchTextInput = ({onChangeText, value, ...props}) => {
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    props.onBlur();
  }, [props]);

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: focused ? colors.orange : colors.borderGray,
          },
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  input: {
    alignSelf: 'center',
    textAlign: 'left',
    height: 48,
    color: colors.jetBlack,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '100%',
    fontSize: 16,
  },
});

export default SearchTextInput;
