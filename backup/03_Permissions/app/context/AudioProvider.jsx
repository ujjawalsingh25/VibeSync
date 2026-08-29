import { Alert, Text, View } from 'react-native'
import React, { Component } from 'react'
import * as MediaLibrary from 'expo-media-library'

export class AudioProvider extends Component {

  constructor (props) {
    super(props)
  }

  permissionAlert = () => {
    Alert.alert(
      "Permission Required",                // title
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
    }

    if(!permission.granted && permission.canAskAgain) {   // continue the pop-up till denied or accept
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()    
      if(status === 'denied' && canAskAgain) {
        // Alert that user must allow the permission to run the player
        this.permissionAlert()
      }
      if(status === 'granted') {
        // Get all Audio Files
      }
      if(status === 'denied' && !canAskAgain) {     // if opted Never Ask Again
        // Display error 
      }
    }
    
  }

  componentDidMount(){
    this.getPermission()
  }

  render() {
    return (
      <View>
        <Text>AudioProvider</Text>
      </View>
    )
  }
}

export default AudioProvider;