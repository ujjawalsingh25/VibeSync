import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator'
import AudioProvider from './app/context/AudioProvider';
import AudioListItem from './app/components/AudioListItem';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

export default function App() {
  // return (
  //   <AudioProvider>
  //     <NavigationContainer>
  //       <AppNavigator />
  //     </NavigationContainer>
  //   </AudioProvider>
  // );
  return(
    <View style={{marginTop: 50}}>
      <ScrollView>
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      <AudioListItem />
      </ScrollView>
    </View>
  );
}