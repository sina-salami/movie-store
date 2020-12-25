import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import {MovieCard} from '../../components';
import {colors, sendRequest} from '../../utils';

const MovieList = ({route}) => {
  const [movies, setMovies] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const {name} = route.params;

  useEffect(() => {
    setLoading(true);
    sendRequest('GET', `/movie/?tags=${name}`)
      .then((res) => {
        setMovies(res.body.results);
        setNext(res.body.next);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  const renderItem = ({item}) => {
    return <MovieCard movie={item} width={300} height={150} noMargin />;
  };

  const getNewMovies = () => {
    setLoading(true);
    if (next) {
      sendRequest('GET', next)
        .then((res) => {
          setMovies((oldMovies) => [...oldMovies, ...res.body.results]);
          setLoading(false);
          setNext(res.body.next);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={getNewMovies}
      ListFooterComponent={() =>
        loading ? (
          <ActivityIndicator
            style={[styles.indicator, styles.footer]}
            size={'large'}
            color={colors.jetBlack}
          />
        ) : (
          <View style={styles.footer} />
        )
      }
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
  footer: {
    marginBottom: 20,
  },
});

export default MovieList;
