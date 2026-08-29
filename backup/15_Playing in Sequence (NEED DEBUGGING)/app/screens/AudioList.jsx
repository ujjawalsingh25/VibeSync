import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider';
import {RecyclerListView, LayoutProvider } from 'recyclerlistview'
import Screen from '../components/Screen';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';
import {Audio} from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioController';

export class AudioList extends Component {
    static contextType = AudioContext;

    constructor(props) {
        super(props);
        this.state = {
            OptionModalVisible: false,
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
    } );
  
    onPlaybackStatusUpdate = async playbackStatus => {
        // console.log(playbackStatus);          //{"durationMillis": 366315, "isBuffering": false, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": false, "playableDurationMillis": 64757, "positionMillis": 2173, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": false, "uri": "/storage/emulated/0/Download/Shri Ram Chandra Kripalu Bhajman-(PagalWorld).mp3", "volume": 1}}
        if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
            // console.log("Updating");            
            this.context.updateState(this.context, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis,
            });
        }

        if(playbackStatus.didJustFinish || playbackStatus.positionMillis === playbackStatus.durationMillis) {
            console.log("Current audio finished, selecting next...");
            const nextAudioIndex = this.context.currentAudioIndex + 1;
            if(nextAudioIndex >= this.context.totalAudioCount) {        // there is no next audio to play
                this.context.playbackObj.unloadAsync();
                return this.context.updateState(this.context, {
                    soundObj: null, 
                    currentAudio: this.context.audioFiles[0],    
                    isPlaying: false,
                    currentAudioIndex: 0,  
                    playbackPosition: null,
                    playbackDuration: null
                }); 
            }
            // Else we want to select the next audio
            const audio = this.context.audioFiles[nextAudioIndex];
            const status = await playNext(this.context.playbackObj, audio.uri);
            this.context.updateState(this.context, {
                soundObj: status, 
                currentAudio: audio,    
                isPlaying: true,
                currentAudioIndex: nextAudioIndex,
            }); 
        }        
    };

    handleAudioPress = async audio => {
        const {soundObj, playbackObj, currentAudio, updateState, audioFiles, } = this.context;

    // _______  Playing audio first time  ____________
        if(soundObj === null){
            // console.log(audio);
            const playbackObj = new Audio.Sound()
            const status = await play(playbackObj, audio.uri)
            // console.log(status);        // {""isBuffering": true, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": true, androidImplementation": "SimpleExoPlayer", "audioPan": 0, "didJustFinish": false, "durationMillis": 283896, "playableDurationMillis": 33959, "positionMillis": 0, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": true, "uri": "/storage/emulated/0/Download/My-Heart-Will-Go-On.mp3", "volume": 1}
            const index = audioFiles.indexOf(audio);
            updateState(this.context, {
                currentAudio: audio,
                playbackObj: playbackObj, 
                soundObj: status, 
                isPlaying: true,
                currentAudioIndex: index,
            });
            return playbackObj.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
        }

    // _______  Pause Audio  ____________
        if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
            // console.log("Audio is already playing");
            const status = await pause(playbackObj);
            return updateState(this.context, {
                soundObj: status, 
                isPlaying: false, 
            })
        }

    // _______   Resume Audio  ____________
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
        const status = await resume(playbackObj)
        return updateState(this.context, {
            soundObj: status,
            isPlaying: true,
        })
    }

    // _______   Select Another Audio  ____________
        // if(soundObj.isLoaded && currentAudio.id !== audio.id){
        // if(soundObj.isLoaded && currentAudio.id !== audio.id || playbackStatus.positionMillis === playbackStatus.duration || playbackStatus.didJustFinish){
        if(soundObj.isLoaded && currentAudio.id !== audio.id || playbackStatus.positionMillis === playbackStatus.duration || playbackStatus.didJustFinish){
            // console.log("Next Audio Select");            
            const status = await playNext(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio);
            return updateState(this.context, {
                currentAudio: audio, 
                soundObj: status, 
                isPlaying: true,
                currentAudioIndex: index,
            });
        }
    }

    rowRenderer = (type, item, index, extendedState) => {
        // console.log(item);                           // log the audio files in the device         
        // return  <Text> { item.filename } </Text>
        // console.log(extendedState);
        return  <AudioListItem
            title={item.filename} 
            isPlaying = {extendedState.isPlaying}
            activeListItem = {this.context.currentAudioIndex === index}
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
            {({dataProvider, isPlaying}) =>  {
                return (
                    // <View style={{flex: 1}}>
                    <Screen>
                        <RecyclerListView 
                            dataProvider={dataProvider} 
                            layoutProvider={this.layoutProvider} 
                            rowRenderer={this.rowRenderer} 
                            extendedState={{isPlaying}}   // RecyclerListView is component for performane so need to specify if need to re-render
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