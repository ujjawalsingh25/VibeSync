import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Player from './player';
import Songs from './songs';
import Sync from './sync';
import Discover from './discover';
import Profile from './profile';
import { HeaderDiscover, HeaderLogo } from '@/app/components/Headers';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator()

const TabLayout = () => {

    return <Tab.Navigator>
        <Tab.Screen 
            name='Songs' 
            component={Songs} 
            options={ {
                tabBarIcon: ( {color, size} ) => ( <Ionicons name="headset" size={size} color={color} /> ),
                // headerStyle: { backgroundColor: lightTheme ? color.myWhite : color.myBlack },
                // headerTitleStyle: { fontWeight: 'bold', color: lightTheme ? color.myBlack : color.myWhite },
                headerTitleAlign: 'center',
                headerTitle: '',
                headerBackground: () => <HeaderLogo />,
            }} 
        />
        <Tab.Screen 
            name='Player' 
            component={Player} 
            options={ {
                tabBarIcon: ( {color, size} ) => ( <FontAwesome name="music" size={size} color={color} /> ),
                headerTitleAlign: 'center',
                headerTitle: '',
                headerBackground: () => <HeaderLogo />,
            }} 
        />
        <Tab.Screen 
            name='Sync' 
            component={Sync} 
            options={ {
                tabBarIcon: ( {color, size} ) => ( <MaterialCommunityIcons name="account-group" size={size} color={color} /> ),
                headerTitleAlign: 'center',
                headerTitle: '',
                headerBackground: () => <HeaderLogo />,
            }} 
        />
        <Tab.Screen 
            name='Discover' 
            component={Discover} 
            options={ {
                tabBarIcon: ( {color, size} ) => ( <FontAwesome6 name="compass" size={size} color={color} /> ),
                headerTitleAlign: 'center',
                headerTitle: '',
                headerLeft: () => <HeaderDiscover />,
            }} 
        />
        <Tab.Screen 
            name='Profile' 
            component={Profile} 
            options={ {
                tabBarIcon: ( {color, size} ) => ( <MaterialIcons name="account-circle" size={size} color={color} /> ),
                headerTitleAlign: 'center',
                headerTitle: '',
                headerBackground: () => <HeaderLogo />,
            }} 
        />
    </Tab.Navigator>
}


export default TabLayout;