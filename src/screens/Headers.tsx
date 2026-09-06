import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useToggleThemeStore } from '../../store/toggleThemeStore';


export const HeaderLogo = () => {
    // let colorTheme = "dark";
    const colorTheme = useToggleThemeStore((state) => state.colorTheme);
    
    return (
        <View style={[
            styles.headerLogoContainer,
            {
                backgroundColor: colorTheme === 'dark' ? '#181818' : '#fff', 
                borderColor: colorTheme === 'dark' ? '#212121' : "#E0E0E0"
            }
        ]}>
            <Image 
                style={styles.headerImg}
                source={ colorTheme === "dark" 
                    ? require('@/assets/logo/logoTitle_DarkTheme.png')
                    : require('@/assets/logo/logoTitle_LightTheme.png')
                }
            />
        </View>
    )
};

export const HeaderDiscover = () => {
    // let colorTheme = "dark";
    const colorTheme = useToggleThemeStore((state) => state.colorTheme);
    return (
        <>
            <View style={[
                styles.discoverHeaderContainer,
                {
                    backgroundColor: colorTheme === 'dark' ? '#181818' : '#fff', 
                    borderColor: colorTheme === 'dark' ? '#212121' : "#E0E0E0"
                }
            ]}>
                <Image
                    style={styles.discoverImg}
                    source={ colorTheme === "dark" 
                        ? require('@/assets/logo/logoTitle_DarkTheme.png')
                        : require('@/assets/logo/logoTitle_LightTheme.png')
                    }
                />
                <Pressable style={styles.offlineButton}>
                    <Ionicons   name="cloud-offline" size={30} 
                        color={colorTheme === "dark" ? "#E0E0E0" : "black"}
                    />
                    <Text style={{ color: colorTheme === "dark" ? "#E0E0E0" : "black" }}>Offline</Text>
                </Pressable>
            </View>
        </>
    )
};


const styles = StyleSheet.create({
    headerLogoContainer:{
        width: '100%', 
        height: '10%',
        // backgroundColor: '#fff',      
        alignItems: 'flex-end', 
        justifyContent: 'center',
        zIndex: 10, 
        // borderColor: '#E0E0E0', 
        borderWidth: 2,
    },
    headerImg: {
        width: '80%', 
        height: '70%', 
        resizeMode: 'contain',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: '6%',
    },

    discoverHeaderContainer: {
        width: '100%', 
        height: '10%',
        backgroundColor: '#fff', 
        flexDirection: 'row',
        alignItems: 'flex-end', 
        justifyContent: 'center',
        zIndex: 10, 
        // borderColor: '#E0E0E0', 
        borderWidth: 2,
    },
    discoverImg: {
        width: '80%', 
        height: '70%', 
        resizeMode: 'contain',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: '6%',
    },
    offlineButton: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 15,
    },
})