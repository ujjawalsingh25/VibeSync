import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ThemeContext } from '../context/ThemeContext' 
// Screens
import AudioList from '../screens/AudioList';
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import color from '../misc/Color';


const Tab = createBottomTabNavigator();
// console.log(Tab);    
const AppNavigator = () => {
    const { lightTheme } = useContext(ThemeContext);
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='AudioList' 
                component={AudioList} 
                options={ {
                    tabBarIcon: ( {color, size} ) => ( <Ionicons name="headset" size={size} color={color} /> ),
                    headerStyle: { backgroundColor: lightTheme ? color.myWhite : color.myBlack },
                    headerTitleStyle: { fontWeight: 'bold', color: lightTheme ? color.myBlack : color.myWhite },
                    headerTitleAlign: 'center',
                }} 
            />
        <Tab.Screen 
            name='Player' 
            component={Player} 
            options={ { 
               tabBarIcon: ( {color, size} ) => ( <FontAwesome name="music" size={size} color={color} /> ),
               headerStyle: { backgroundColor: lightTheme ? color.myWhite : color.myBlack },
               headerTintColor: lightTheme ? color.myBlack : color.myWhite,
                headerTitleStyle: { fontWeight: 'bold', color: lightTheme ? color.myBlack : color.myWhite },
                headerTitleAlign: 'center',
            }} 
        />
        <Tab.Screen 
            name='PlayList' 
            component={PlayList} 
            options={ {
               tabBarIcon: ( {color, size} ) => ( <MaterialIcons name="my-library-music" size={size} color={color} /> ),
                headerStyle: { backgroundColor: lightTheme ? color.myWhite : color.myBlack },
                headerTintColor: lightTheme ? color.myBlack : color.myWhite,
                headerTitleStyle: { fontWeight: 'bold', color: lightTheme ? color.myBlack : color.myWhite },
                headerTitleAlign: 'center',
              }}
        />
    </Tab.Navigator>
    );
}

export default AppNavigator;

