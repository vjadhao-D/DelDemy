
import{NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../ContextProvider/AuthContext';
import AuthStack from './AuthStack';
import DashboardStack from './DashBoardStack';

const Stack = createStackNavigator();

const AppNavigation = () => {
    const {isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {
        isLoggedIn ? <DashboardStack /> : <AuthStack />
      }
    </NavigationContainer>
  );
}
export default AppNavigation;
