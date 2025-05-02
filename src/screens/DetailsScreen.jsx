import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  fetchCourses,
  postCourse,
  deleteCourse,
  updateCourse,
} from '../data/Courses';

import {useCart} from '../ContextProvider/CartContextProvider';

const DetailsScreen = ({route}) => {
  const CartContext = useCart();
  const {course} = route.params;
  const [likes, setLikes] = React.useState(course.like);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: course.imgUrl}} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{course.title}</Text>
      </View>
      <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      <Text style={styles.price}>Price: ${course.price}</Text>
      <Text style={styles.rating}>Rating: {course.rating} ⭐</Text>
      <Text style={styles.enrolled}>Enrolled: {course.enrolled} students</Text>
      <Text style={styles.description}>{course.description}</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            setLikes(likes + 1);
            updateCourse(course.id, {
              ...course,
              like: likes + 1,
            });
          }}>
          <Text style={styles.likesContainer}>Like 👍: {likes}</Text>
        </TouchableOpacity>
      </View>
      {CartContext.cartItems.some(item => item.id === course.id) ? (
        <Button
          title="Already in Cart"
          color="#f194ff"
          disabled={true}
          onPress={() => CartContext.updateCart(course)}
        />
      ) : (
        <Button
          title="Add to Cart"
          color="#f194ff"
          onPress={() => CartContext.updateCart(course)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructor: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4caf50',
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffa500',
  },
  enrolled: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'justify',
  },
  likesContainer: {
    justifyContent: 'right',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    flexWrap: 'wrap',
  },
});

export default DetailsScreen;
