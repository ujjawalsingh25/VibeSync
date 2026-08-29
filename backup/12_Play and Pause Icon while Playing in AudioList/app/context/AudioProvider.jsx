import { Alert, Text, View, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import {DataProvider} from 'recyclerlistview'

export const AudioContext = createContext();
export class AudioProvider extends Component {

  constructor (props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
    }
  }

  permissionAlert = () => {
    Alert.alert(      "Permission Required",                // title
      "App need to read audio files!",      // message
      [                                     // Alert-Button & Options
        { 
          text: "Agree",                     // Alert-Button
          onPress: () => this.getPermission()       // Option to pass functions
        },
        {
          text: "Cancel",                             // Alert-Button
          onPress: () => this.permissionAlert()       // Option / pass function
        }
      ]
    )
  }

  getAudioFiles = async () => {
    const {dataProvider, audioFiles} = this.state
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    // console.log(media);
    // console.log(media.assets.length);
    this.setState( {
      ...this.state, 
      dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), 
      audioFiles: [...audioFiles, ...media.assets]
    } )
  }

  getPermission = async () => {
    // {       // Objects in the permissions are :-
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    // }
    const permission = await MediaLibrary.getPermissionsAsync()
    // console.log(permission)
    
    if(permission.granted) {
      // Get all Audio files
      this.getAudioFiles()
    }

    if(!permission.granted && !permission.canAskAgain) {
      this.setState({...this.state, permissionError: true })
    }
    if(!permission.granted && permission.canAskAgain) {   // continue the pop-up till denied or accept
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()    
      if(status === 'denied' && canAskAgain) {
        // Alert that user must allow the permission to run the player
        this.permissionAlert()
      }
      if(status === 'granted') {
        // Get all Audio Files
        this.getAudioFiles();
      }
      if(status === 'denied' && !canAskAgain) {     // if opted Never Ask Again
        // Display error 
        this.setState({...this.state, permissionError: true })
      }
    }
    
  }

  componentDidMount(){
    this.getPermission()
  }

  updateState = (prevState, newState = {}) => {
    this.setState({...prevState, ...newState})
  } 

  render() {
    const {
      audioFiles, 
      dataProvider, 
      permissionError, 
      playbackObj, 
      soundObj, 
      currentAudio, 
      isPlaying, 
      currentAudioIndex, } = this.state
    if(permissionError)  return <View style={styles.permissionREQ}>
      <Text style={styles.songListsText}>Please accept the permission to run Music-Player</Text>
    </View>
    return <AudioContext.Provider value={{ 
        audioFiles, 
        dataProvider, 
        playbackObj, 
        soundObj, 
        currentAudio,
        isPlaying,
        currentAudioIndex,
        updateState: this.updateState,
      }}>
      {this.props.children}
    </AudioContext.Provider>
  }
}

export default AudioProvider;

const styles = StyleSheet.create({
  permissionREQ: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  songListsText: {
      fontSize: 25,
      color: 'red',
      textAlign: 'center'
  }
})