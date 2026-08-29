import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { AudioContext } from '../context/AudioProvider';

export class AudioList extends Component {
    static contextType = AudioContext
    render() {
        return (
        <ScrollView>
            {this.context.audioFiles.map(
                item => <Text style={styles.songLists} key={item.id}> 
                    {item.filename} 
                </Text>
            )}
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    songLists: {
        padding: 18,
        borderRadius: 6,
        backgroundColor: '#999999',
        borderBottomColor: '#717171',
        borderBottomWidth: 3
    }
})

export default AudioList