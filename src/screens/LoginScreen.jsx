import React from 'react';
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {useAuth} from '../ContextProvider/AuthContext';
import {SetValue} from '../asyncstorage/dataStore'; // Assuming you have a SetValue function in your async storage module

export default function LoginScreen({navigation}) {
  const {control, handleSubmit, reset} = useForm();
  const {setUser, login} = useAuth(); // Assuming you have a setUser function in your AuthContext

  const onSubmit = data => {
    console.log('Login data:', data);
    // Save user data to async storage
    SetValue('user', data)
      .then(() => {
        console.log('User  saved to async storage');
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
    axios
      .post('http://10.0.2.2:4000/login', data)
      .then(response => {
        if (response.status === 200) {
          login(response.data); // Assuming response.data contains user data
        } else {
          Alert.alert('Login Failed', 'Invalid credentials, please try again.');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Login Error', 'An error occurred while logging in.');
      });
    reset(); // Reset form fields after submission
  };

  const handleReset = () => {
    reset(); // Reset form fields
    Alert.alert('Form Reset', 'All fields have been cleared.');
  };

  const handleRegister = () => {
    navigation.navigate('Register'); // Navigate to the Register screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            color="#4caf50"
          />
        </View>
        <View style={styles.button}>
          <Button title="Reset" onPress={handleReset} color="#f44336" />
        </View>
        <View style={styles.button}>
          <Button title="Register" onPress={handleRegister} color="#4caf50" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1a1a2e', // Updated background color
  },
  label: {
    color: 'white',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#4caf50', // Updated button background color (green)
    borderRadius: 4,
    overflow: 'hidden',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
