import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ErrorText} from '../../components';
import {colors, sendRequest} from '../../utils';

const CategoryList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    sendRequest('GET', '/category')
      .then((res) => {
        setCategories(res.body.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch the list from the server.');
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.jetBlack} />
      ) : error ? (
        <ErrorText error={error} />
      ) : (
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.scrollerContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={`category${index}`}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Category', {
                  name: category.name,
                  id: category.id,
                })
              }>
              <Text style={styles.cardText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scroller: {
    paddingHorizontal: '5%',
  },
  scrollerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: colors.coral,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 20,
    color: colors.jetBlack,
  },
});

export default CategoryList;
