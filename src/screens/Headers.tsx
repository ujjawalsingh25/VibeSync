import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';


export const HeaderLogo = () => (
    <View style={styles.headerLogoContainer}
    >
        <Image
          source={require('@/assets/logo/logoTitle_LightTheme.png')}
          style={styles.headerImg}
        />
    </View>
);

export const HeaderDiscover = () => (
    <>
        <View style={styles.discoverHeaderContainer}
        >
            <Image
            source={require('@/assets/logo/logoTitle_LightTheme.png')}
            style={styles.discoverImg}
            />
        </View>
        <Pressable style={styles.offlineButton}>
            <Ionicons name="cloud-offline" size={30} color="black" />
            <Text>Offline</Text>
        </Pressable>
    </>
);


const styles = StyleSheet.create({
    headerLogoContainer:{
        width: '100%', 
        height: '10%',
        backgroundColor: '#fff', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
        zIndex: 10, 
        borderColor: '#E0E0E0', 
        borderWidth: 2,
    },
    headerImg: {width: '80%', 
        height: '70%', 
        resizeMode: 'contain',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: '6%',
    },
    discoverHeaderContainer: {
        width: '170%', 
        height: '85%',
        backgroundColor: '#fff', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
    },
    discoverImg: {
        width: '80%', 
        height: '100%', 
        resizeMode: 'cover',
        marginLeft: 'auto', 
        marginRight: 'auto',
    },
    offlineButton: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 15,
    },
})