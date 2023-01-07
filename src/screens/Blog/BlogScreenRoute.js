import BlogScreen from "./BlogScreen";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AddBlog from "./AddBlog";
import { UploadBlog } from "./UploadBlog";

const BlogScreenTab = createStackNavigator();
const BlogScreenRoute = ({ navigation }) => (
    <BlogScreenTab.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <BlogScreenTab.Screen name="Home" component={BlogScreen} options={{
            title: 'Blogs',
            headerLeft: () => (
                <Icon.Button name="book" size={25} backgroundColor="#009387"></Icon.Button>
            )
        }} />
        <BlogScreenTab.Screen name="Add Blog" component={AddBlog} />
        <BlogScreenTab.Screen name="Upload Blog" component={UploadBlog} />
    </BlogScreenTab.Navigator>
);
export default BlogScreenRoute