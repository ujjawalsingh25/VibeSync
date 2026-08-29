import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { } from 
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
    return <Tab.Navigator>
        <Tab.Screen
            name='AudioList' 
            component={AudioList} 
            options={ {
               tabBarIcon: ( {color, size} ) => ( <Ionicons name="headset" size={size} color={color} /> ),
               headerStyle: { backgroundColor: '#E5E4E2', },
              headerTintColor: color.myBlack,
              headerTitleStyle: { fontWeight: 'bold' },
              headerTitleAlign: 'center',
            }} 
        />
        <Tab.Screen 
            name='Player' 
            component={Player} 
            options={ {
               tabBarIcon: ( {color, size} ) => ( <FontAwesome name="music" size={size} color={color} /> )
            }} 
        />
        <Tab.Screen 
            name='PlayList' 
            component={PlayList} 
            options={ {
               tabBarIcon: ( {color, size} ) => ( <MaterialIcons name="my-library-music" size={size} color={color} /> )
            }} 
        />
    </Tab.Navigator>
}

export default AppNavigator;