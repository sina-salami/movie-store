import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../utils';

const MovieCard = ({movie}) => {
  return (
    <View style={styles.container}>
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
            {movie.tags.map((tag, index) => (
              <Text style={styles.tag} key={`${movie.id}tag${index}`}>
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
    backgroundColor: colors.blueGreen,
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

export default MovieCard;
