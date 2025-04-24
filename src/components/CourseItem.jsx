import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CourseItem = ({ course }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
        <Text style={styles.description}>{course.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructor: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    fontSize: 14,
  },
});

export default CourseItem;