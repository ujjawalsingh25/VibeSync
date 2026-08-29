import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider';
import {RecyclerListView, LayoutProvider } from 'recyclerlistview'
import Screen from '../components/Screen';
import AudioListItem from '../components/AudioListItem';

export class AudioList extends Component {
    static contextType = AudioContext

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dimension) => {
        switch(type) {
            case 'audio': 
                dimension.width = Dimensions.get('window').width;
                dimension.height = 70;
                break;
            default:
                dimension.width = 0;
                dimension.height = 0;
        }
    } )

    rowRenderer = (type, item) => {
        // console.log(item);                           // log the audio files in the device         
        // return  <Text> { item.filename } </Text>
        return  <AudioListItem
            title={item.filename} 
            duration={item.duration} 
            onOptionPress={() => {
                console.log("Opening Options");                
            }}    
        />
    }

    render() {
        return <AudioContext.Consumer> 
            {({dataProvider}) =>  {
                return (
                    // <View style={{flex: 1}}>
                    <Screen>
                        <RecyclerListView 
                            dataProvider={dataProvider} 
                            layoutProvider={this.layoutProvider} 
                            rowRenderer={this.rowRenderer} 
                        />
                        </Screen>
                    // </View>
                ); 
            } }
        </AudioContext.Consumer>
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
    },
    songsView: {
        flex: 1
    }
})

export default AudioList