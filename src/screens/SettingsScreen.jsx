import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAuth} from '../ContextProvider/AuthContext'; // Ensure this hook exists in your project

const SettingsScreen = () => {
  const {logout} = useAuth(); // Destructure the logout method from useAuth hook

  const handleSignOut = () => {
    logout(); // Call the logout method when the button is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SettingsScreen;
