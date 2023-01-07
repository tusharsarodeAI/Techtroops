import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainBottomTabScreen from './MainBottomTabScreen';
import Login from '../Auth/LoginScreen';
import Register from '../Auth/RegistrationScreen';

const Stack = createStackNavigator();

export default function MainRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Register" component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Home" component={MainBottomTabScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
