import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartComponent';
import {useCart} from '../ContextProvider/CartContextProvider';

const Header = () => {
  const navigation = useNavigation();
  const cartContext = useCart();
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> 📚 Deldemy</Text>

      <CartIcon
        itemCount={cartContext.cartItems.length}
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#CEDDBB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Header;
