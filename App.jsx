import React  from 'react';

import {Button, View, SafeAreaView, StyleSheet} from 'react-native';
import {CartContextProvider} from './src/ContextProvider/CartContextProvider';
import AuthContextProvider from './src/ContextProvider/AuthContext';
import AppNavigation from './src/appNavigation/AppNavigation';


function App() {

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <SafeAreaView style={styles.safeArea}>
          <AppNavigation />
        </SafeAreaView>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default App;
