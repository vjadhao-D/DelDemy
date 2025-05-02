import React, {use, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {useCart} from '../ContextProvider/CartContextProvider';
const CartScreen = ({route}) => {
  const cartContext = useCart();
  useEffect(() => {
    console.log('Cart items:', cartContext.cartItems);
  }, [cartContext.cartItems]);

  const removeItem = item => {
    console.log('Item to remove:', item);
    cartContext.deleteItem(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartContext.cartItems}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Button title="Remove" onPress={() => removeItem(item)}></Button>
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Total: $
          {cartContext.cartItems.reduce(
            (total, item) => total + parseFloat(item.price),
            0,
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 16,
    flex: 1, // Allow the title to take up available space
    flexWrap: 'wrap', // Enable wrapping to the next line
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10, // Add spacing between title and price
  },
});
export default CartScreen;
