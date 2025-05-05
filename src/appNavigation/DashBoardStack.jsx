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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#757575',
            tabBarLabelStyle: styles.tabBarLabel,
          }}>
          <Tab.Screen
            name="Courses"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="home" size={30} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="shopping-cart" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="cog" size={size} color={color} />
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
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DashboardStack;
