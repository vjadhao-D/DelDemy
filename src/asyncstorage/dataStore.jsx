import AsyncStorage from '@react-native-async-storage/async-storage';
const GetValue = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
  return null;
};

const SetValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
  return true;
};

export {GetValue, SetValue};
