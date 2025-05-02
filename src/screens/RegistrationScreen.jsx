import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Alert} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';

export default function RegistrationScreen() {
  const {control, handleSubmit, reset, watch} = useForm();
  const password = watch('password'); // Watch password for confirm password validation

  // State for DropDownPicker
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]);

  const onSubmit = data => {
    setGender(null);
    Alert.alert('Registration Data', JSON.stringify(data));
    reset(); // Reset form fields after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        rules={{required: 'First name is required'}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Enter your first name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        rules={{required: 'Last name is required'}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Enter your last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

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

      <Text style={styles.label}>Gender</Text>
      <Controller
        control={control}
        name="gender"
        rules={{required: 'Gender is required'}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={val => {
                onChange(val); // Pass the value to react-hook-form
              }} // Use onChange from react-hook-form
              setItems={setItems}
              placeholder="Select Gender"
              style={[styles.dropdown, error && {borderColor: 'red'}]}
              dropDownContainerStyle={styles.dropdownContainer}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <Controller
        control={control}
        name="mobile"
        rules={{
          required: 'Mobile number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Invalid mobile number',
          },
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Enter your mobile number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
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

      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm password is required',
          validate: value => value === password || 'Passwords do not match',
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={[styles.input, error && {borderColor: 'red'}]}
              placeholder="Confirm your password"
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
            title="Register"
            onPress={handleSubmit(onSubmit)}
            color="#4caf50"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Reset"
            onPress={() => {
              reset(); // Reset form values
              setGender(null); // Reset DropDownPicker state
              setOpen(false); // Close the dropdown if open
            }}
            color="#f44336"
          />
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
    backgroundColor: '#1a1a2e',
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
    borderRadius: 4,
    overflow: 'hidden',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
  },
  dropdownContainer: {
    backgroundColor: 'white',
  },
});
