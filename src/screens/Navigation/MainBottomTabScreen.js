import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import FeedScreenRoute from '../Feed/FeedRoute';
import ProfileScreenRoute from '../Profile/ProfileScreenRoute';
import BlogScreenRoute from '../Blog/BlogScreenRoute';
import AlertRoute from '../Alerts/AlertRoute';
import EbookRoute from '../EBook/EbooksRoute';

const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainBottomTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
    >
        <Tab.Screen
            name="Home"
            component={FeedScreenRoute}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Notifications"
            component={AlertRoute}
            options={{
                tabBarLabel: 'Updates',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={BlogScreenRoute}
            options={{
                tabBarLabel: 'Explore',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Ebooks"
            component={EbookRoute}
            options={{
                tabBarLabel: 'E Books',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <Icon name="book" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ProfileScreenRoute}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#d02860',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainBottomTabScreen;



const DetailsStackScreen = ({ navigation }) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </DetailsStack.Navigator>
);