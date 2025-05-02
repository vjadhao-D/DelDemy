import axios from 'axios';

const fetchCourses = async () => {
  console.log('fetchCourses called');
  try {
    const response = await axios.get('http://10.0.2.2:3000/Courses'); // Replace with a valid API endpoint
    console.log('fetchCourses response', response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the courses!', error);
    return [];
  }
};

const postCourse = async course => {
  console.log('course post call', course);
  try {
    const response = await axios.post('http://10.0.2.2:3000/Courses', course); // Replace with a valid API endpoint
    return response.data;
    console.log('course post response', response.data);
  } catch (error) {
    console.error('There was an error posting the course!', error);
    return null;
  }
};

const deleteCourse = async id => {
  try {
    const response = await axios.delete(`http://10.0.2.2:3000/Courses/${id}`); // Replace with a valid API endpoint
    return response.data;
  } catch (error) {
    console.error('There was an error deleting the course!', error);
    return null;
  }
};
const updateCourse = async (id, course) => {
  try {
    const response = await axios.put(
      `http://10.0.2.2:3000/Courses/${id}`,
      course,
    ); // Replace with a valid API endpoint
    return response.data;
  } catch (error) {
    console.error('There was an error updating the course!', error);
    return null;
  }
};

export {fetchCourses, postCourse, deleteCourse, updateCourse};
