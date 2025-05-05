import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CourseItem from '../components/CourseItem';
import {fetchCourses} from '../data/Courses';
function HomeScreen({navigation}) {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchCourses()
        .then(data => {
          setCourses(data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore Our Courses</Text>
      <FlatList
        data={courses}
        renderItem={({item}) => (
          <CourseItem
            course={item}
            onPress={() => navigation.navigate('Details', {course: item})}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  listContent: {
    paddingBottom: 1,
  },
});

export default HomeScreen;
