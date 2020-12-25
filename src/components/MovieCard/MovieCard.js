import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../utils';

const screenWidth = Dimensions.get('screen').width;

const MovieCard = ({movie, index, width, height, noMargin}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          marginLeft: noMargin
            ? 0
            : index
            ? screenWidth / 40
            : screenWidth / 20,
        },
      ]}>
      <Text style={styles.title}>
        {movie.title} - {movie.date_of_release.split('-')[0]}
      </Text>
      <Text style={styles.director}>
        <Ionicons name={'person'} size={18} color={colors.jetBlack} />{' '}
        {movie.director.split(': ')[1]}
      </Text>
      <Text style={styles.info}>
        <AntIcon name={'like1'} size={18} color={colors.jetBlack} />{' '}
        {movie.rating}
      </Text>
      <View style={styles.tagWrapper}>
        {movie.tags && (
          <>
            <AntIcon name={'tags'} size={18} color={colors.jetBlack} />
            {movie.tags.map((tag, i) => (
              <Text style={styles.tag} key={`${movie.id}tag${i}`}>
                {' '}
                {tag}
                {index !== movie.tags.length - 1 && ','}
              </Text>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 120,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.red,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.jetBlack,
  },
  director: {
    fontSize: 14,
    marginTop: -7,
    color: colors.jetBlack,
  },
  info: {
    fontSize: 14,
  },
  tagWrapper: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 12,
    color: colors.jetBlack,
  },
});

export default MovieCard;
