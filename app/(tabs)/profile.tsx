import ProfileScreen from '@/screens/ProfileScreen'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.container}>
            <ProfileScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: '-3%',
    },
})

export default Profile;