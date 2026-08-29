import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Songs = () => {
    return (
        <View style={styles.container}>
            <Text>Songs</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-3%',
    },
})

export default Songs;