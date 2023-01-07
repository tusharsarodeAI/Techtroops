import FeedScreen from "./OppAlert";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JobAlert from "./JobAlert";
import OppAlert from "./OppAlert";
import JobDetail from "./JobDetail";
import OppDetail from "./OppDetail";
import Internship from "./Internship";
import IntDetail from "./IntDetail";

const TopTabs = createMaterialTopTabNavigator();
const JobScreenTab = createStackNavigator();
const OppScreenTab = createStackNavigator();
const IntScreenTab = createStackNavigator();


const AlertRoute = ({ navigation }) => (
    <TopTabs.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }} style={{ marginTop: 30 }}>
        <TopTabs.Screen name="Job" component={JobRoute}
        />
        <TopTabs.Screen name="Compitition" component={ComRoute}
        />
        <TopTabs.Screen name="Internship" component={IntRoute}
        />
    </TopTabs.Navigator>
);

export default AlertRoute;

const JobRoute = ({ navigation }) => (
    <JobScreenTab.Navigator initialRouteName="Job Alert">
        <JobScreenTab.Screen name="Job Alert" component={JobAlert} options={{ headerShown: false }} />
        <JobScreenTab.Screen name="Job Detail" component={JobDetail} options={{ headerShown: false }} />
    </JobScreenTab.Navigator>
)

const ComRoute = ({ navigation }) => (
    <OppScreenTab.Navigator initialRouteName="Opp Alert">
        <OppScreenTab.Screen name="Opp Alert" component={OppAlert} options={{ headerShown: false }} />
        <OppScreenTab.Screen name="Opp Detail" component={OppDetail} options={{ headerShown: false }} />
    </OppScreenTab.Navigator>
)

const IntRoute = ({ navigation }) => (
    <IntScreenTab.Navigator initialRouteName="Opp Alert">
        <IntScreenTab.Screen name="Opp Alert" component={Internship} options={{ headerShown: false }} />
        <IntScreenTab.Screen name="Int Detail" component={IntDetail} options={{ headerShown: false }} />
    </IntScreenTab.Navigator>
)