import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../components/header';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen'; // Create this screen if not already present
import {CartContextProvider} from '../ContextProvider/CartContextProvider';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const DashboardStack = () => {
  return (
    <CartContextProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#CEDDBB" />
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
               <></>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <></>
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </CartContextProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default DashboardStack;
