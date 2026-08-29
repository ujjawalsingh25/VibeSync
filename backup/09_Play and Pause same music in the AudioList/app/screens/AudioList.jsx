import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider';
import {RecyclerListView, LayoutProvider } from 'recyclerlistview'
import Screen from '../components/Screen';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';
import {Audio} from 'expo-av';

export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props) {
        super(props);
        this.state = {
            OptionModalVisible: false,
            playbackObj: null,
            soundObj: null,
            currentAudio: {}
        }
        this.currentItem = {}
    }

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

    handleAudioPress = async audio => {
        // Playing audio first time
        if(this.state.soundObj === null){
            // console.log(audio);
            const playbackObj = new Audio.Sound()
            const status = await playbackObj.loadAsync(
                {uri: audio.uri}, 
                {shouldPlay: true}
            );
            // console.log(status);        // {""isBuffering": true, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": true, androidImplementation": "SimpleExoPlayer", "audioPan": 0, "didJustFinish": false, "durationMillis": 283896, "playableDurationMillis": 33959, "positionMillis": 0, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": true, "uri": "/storage/emulated/0/Download/My-Heart-Will-Go-On.mp3", "volume": 1}
            return this.setState({
                ...this.state, 
                currentAudio: audio,
                playbackObj: playbackObj, 
                soundObj: status 
            })
        }
        //Pause Audio
        if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying){
            // console.log("Audio is already playing");
            const status = await this.state.playbackObj.setStatusAsync({shouldPlay: false})     
            return this.setState({
                ...this.state,  
                soundObj: status 
            });       
        }
        // Resume Audio
        if(this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio.id === audio.id){
            const status = await this.state.playbackObj.playAsync()
            return this.setState({
                ...this.state,  
                soundObj: status 
            });
        }
    }

    rowRenderer = (type, item) => {
        // console.log(item);                           // log the audio files in the device         
        // return  <Text> { item.filename } </Text>
        return  <AudioListItem
            title={item.filename} 
            duration={item.duration}
            onAudioPress={() => this.handleAudioPress(item)} 
            onOptionPress={() => {
                // console.log("Opening Options");   
                this.currentItem = item;
                this.setState({...this.state, OptionModalVisible: true})
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
                        <OptionModal 
                            onPlayListPress={() => console.log("Added to Playlist")}
                            onPlayPress={() => console.log("Playing Song")}
                            currentItem = {this.currentItem}
                            onClose={() => this.setState({...this.state, OptionModalVisible: false})} 
                            visible={this.state.OptionModalVisible} 
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

export default AudioList;