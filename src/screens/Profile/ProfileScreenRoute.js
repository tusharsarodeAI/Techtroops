import ProfileScreen from "./ProfileScreen";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../constant/color';
import ProfileDrawer from "./ProfileDrawer";
import EditProfile from "./EditProfile";

const ProfileScreenTab = createStackNavigator();
const ProfileScreenRoute = ({ navigation }) => (
    <ProfileScreenTab.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: color.PRIMARY_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileScreenTab.Screen name="Home" component={ProfileScreen, ProfileDrawer} options={{
            headerShown: false
        }} />
        <ProfileScreenTab.Screen name="Edit Profile" component={EditProfile} />
    </ProfileScreenTab.Navigator>
);
export default ProfileScreenRoute