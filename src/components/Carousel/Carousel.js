import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {ErrorText, MovieCard} from '../index';
import {colors} from '../../utils';

const Carousel = ({data, label, style, loading, error}) => {
  const renderItem = ({item, index}) => {
    return <MovieCard movie={item} index={index} width={200} height={120} />;
  };

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.jetBlack} />
      ) : error ? (
        <ErrorText error={error} />
      ) : (
        <FlatList
          data={data}
          horizontal
          style={styles.list}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: colors.jetBlack,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: 10,
  },
  seperator: {
    width: 10,
  },
});

export default Carousel;
