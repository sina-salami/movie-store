import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../../utils';

const MovieListItem = ({movie}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {movie.title} - {movie.date_of_release.split('-')[0]}
      </Text>
      <Text style={styles.director}>{movie.director.split(': ')[1]}</Text>
      <Text style={styles.info}>
        <Text style={styles.infoTitle}>Rating:</Text>
        {movie.rating}
      </Text>
      <View style={styles.tagWrapper}>
        {movie.tags &&
          movie.tags.map((tag, index) => (
            <Text style={styles.tag} key={`${movie.id}tag${index}`}>
              {index !== 0 && ' '}
              {tag}
              {index !== movie.tags.length - 1 && ','}
            </Text>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.orange,
    marginLeft: 10,
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

export default MovieListItem;
