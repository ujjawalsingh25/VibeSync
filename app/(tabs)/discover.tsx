import React from 'react'
import { StyleSheet, View } from 'react-native'

import DiscoverScreen from '@/screens/DiscoverScreen'

const Discover = () => {
    return (
        <View style={styles.container}>
            <DiscoverScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
})

export default Discover;