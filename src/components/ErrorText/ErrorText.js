import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';

const ErrorText = ({error}) => {
  const [text, setText] = useState('');
  const [field, setField] = useState('');

  useEffect(() => {
    if (typeof error === 'string') {
      setText(error);
    } else {
      if (error.non_field_errors) {
        setField('');
        setText(error.non_field_errors[0]);
      } else {
        const firstError = Object.entries(error)[0];
        setField(firstError[0]);
        setText(firstError[1]);
      }
    }
  }, [error, error.non_field_errors]);

  return <Text style={styles.text}>{field ? `${field}: ${text}` : text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ErrorText;
