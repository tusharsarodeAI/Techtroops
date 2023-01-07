
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Ebooks from "./Ebook";

const EbookScreenTab = createStackNavigator();
const EbooksRoute = ({ navigation }) => (
    <EbookScreenTab.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <EbookScreenTab.Screen name="Ebooks" component={Ebooks} options={{
            title: 'E-Books',
            headerLeft: () => (
                <Icon.Button name="book" size={25} backgroundColor="#009387"></Icon.Button>
            )
        }} />
    </EbookScreenTab.Navigator>
);
export default EbooksRoute