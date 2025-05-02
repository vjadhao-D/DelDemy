import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const CourseItem = ({course, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: course.imgUrl}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.instructor}>{course.instructor}</Text>
          <Text style={styles.price}>price: ${course.price}</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderColor: '#ccc',
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
    color: '#000000',
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
