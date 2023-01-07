import * as React from 'react';
import { Button, Settings, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen'
import color from '../../constant/color';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}
function logout({ navigation }) {
    return (
        <View>
            <Text> Log out Page</Text>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    )
}
function Settingsscrren({ navigation }) {
    return (
        <View>
            <Text> Setting Page</Text>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    )
}
function Aboutus({ navigation }) {
    return (
        <View>
            <Text> About Us</Text>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    )
}
const Drawer = createDrawerNavigator();
export default function ProfileDrawer() {
    return (
        <Drawer.Navigator initialRouteName="ProfileScreen">
            <Drawer.Screen name="Profile" component={ProfileScreen}
                options={{ drawerIcon: config => <Icon name="account-circle-outline" color={color.PRIMARY_COLOR} size={25} /> }} />
            <Drawer.Screen name="Setting" component={Settingsscrren}
                options={{ drawerIcon: config => <Icon name="cog" color={color.PRIMARY_COLOR} size={25} /> }}
            />
            <Drawer.Screen name="Notifications" component={NotificationsScreen}
                options={{ drawerIcon: config => <Icon name="bell-ring" color={color.PRIMARY_COLOR} size={25} /> }} />
            <Drawer.Screen name="About Us" component={Aboutus}
                options={{ drawerIcon: config => <Icon name="information" color={color.PRIMARY_COLOR} size={25} /> }} />
            <Drawer.Screen name="Log Out" component={logout}
                options={{ drawerIcon: config => <Icon name="logout" color={color.PRIMARY_COLOR} size={25} /> }} />
        </Drawer.Navigator>
    );
}