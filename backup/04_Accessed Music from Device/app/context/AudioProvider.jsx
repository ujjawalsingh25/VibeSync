import { Alert, Text, View, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'

export const AudioContext = createContext();
export class AudioProvider extends Component {

  constructor (props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false
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
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    // console.log(media);
    // console.log(media.assets.length);
    this.setState({...this.state, audioFiles: media.assets})
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

  render() {
    if(this.state.permissionError)  return <View style={styles.permissionREQ}>
      <Text style={styles.songListsText}>Please accept the permission to run Music-Player</Text>
    </View>
    return <AudioContext.Provider value={{ audioFiles: this.state.audioFiles }}>
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