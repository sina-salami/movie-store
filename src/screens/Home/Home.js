import React, {useState, useEffect, useRef} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {SearchTextInput, Carousel, ErrorText} from '../../components';
import {colors, sendRequest} from '../../utils';
const Home = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [newMovies, setNewMovies] = useState([]);
  const [mostMovies, setMostMovies] = useState([]);
  const [carouselError, setCarouselError] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  const handleSearch = (txt) => {
    if (txt === '') {
      setSearchActive(false);
    } else {
      setSearchActive(true);
    }
    setSearchValue(txt);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (searchValue.length > 2) {
        sendRequest('GET', `/movie/?search=${searchValue}`)
          .then((res) => {
            setSearchResult(res.body.results);
          })
          .catch((err) => {
            console.log(err);
            setSearchError('Failed to fetch data from the server.');
          });
      }
    }, 300);
  }, [searchValue]);

  useEffect(() => {
    setLoading(true);
    sendRequest('GET', '/movie/')
      .then((res) => {
        setNewMovies(res.body.results.filter((_, index) => index < 10));
        setMostMovies(
          res.body.results.filter((_, index) => index < 20 && index > 9),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCarouselError('Failed to fetch from the server');
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      <SearchTextInput
        value={searchValue}
        onChangeText={handleSearch}
        placeholder={'Search movie names...'}
        placeholderTextColor={colors.dimGray}
        onBlur={() => setSearchActive(false)}
      />
      {searchActive ? (
        searchError ? (
          <ErrorText error={searchError} />
        ) : (
          <FlatList
            data={searchResult}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
              return (
                <View style={styles.movieWrapper}>
                  <Text style={styles.title}>
                    {item.title} - {item.date_of_release.split('-')[0]}
                  </Text>
                  <Text style={styles.director}>{item.director}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      ) : (
        <>
          <Carousel
            style={styles.carousel}
            data={newMovies}
            label={'Hot offers'}
            loading={loading}
            error={carouselError}
          />
          <Carousel
            style={styles.carousel}
            data={mostMovies}
            label={'Most viewed'}
            loading={loading}
            error={carouselError}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginTop: 50,
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  movieWrapper: {
    minWidth: '90%',
    width: '90%',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.jetBlack,
  },
  director: {
    fontSize: 14,
    color: colors.jetBlack,
  },
  seperator: {
    height: 5,
  },
});

export default Home;
