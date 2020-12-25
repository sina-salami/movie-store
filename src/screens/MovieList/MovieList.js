import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {MovieListItem} from '../../components';
import {colors, sendRequest} from '../../utils';

const MovieList = ({route}) => {
  const [movies, setMovies] = useState([]);
  const [next, setNext] = useState('');
  const [loading, setLoading] = useState(false);
  const {name, id} = route.params;

  useEffect(() => {
    setLoading(true);
    sendRequest('GET', `/movie/?tags=${name}`)
      .then((res) => {
        console.log(res);
        setMovies(res.body.results);
        setNext(res.body.next);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  const renderItem = ({item}) => {
    return <MovieListItem movie={item} />;
  };

  const getNewMovies = () => {
    sendRequest('GET', next)
      .then((res) => {
        console.log(res);
        setMovies((oldMovies) => [...oldMovies, ...res.body.results]);
        console.log(movies);
        setNext(res.body.next);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={getNewMovies}
      ListFooterComponent={() => (
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          color={colors.jetBlack}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  separator: {
    height: 10,
  },
  indicator: {
    marginVertical: 5,
  },
});

export default MovieList;
