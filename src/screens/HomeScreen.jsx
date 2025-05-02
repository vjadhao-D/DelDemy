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
    <SafeAreaView style={{flex: 1, padding: '5%'}}>
      <Text style={styles.title}>Courses</Text>
      <FlatList
        data={courses}
        renderItem={({item}) => (
          <CourseItem
            course={item}
            onPress={() => navigation.navigate('Details', {course: item})}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
});

export default HomeScreen;
