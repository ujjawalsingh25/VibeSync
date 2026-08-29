import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native'
import Screen from '../components/Screen'
import color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
import {play, pause, playNext, resume, } from '../misc/AudioController'
import { storeAudioForNextOpening } from '../misc/helper';
import RotatingImage from '../misc/RotateImage';
//  Dimensions
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');


const Player = () => {

  const [isRotate, setIsRotate] = useState(false) 
  const [lightTheme, setLightTheme] = useState(false)
  const tempImg = 'https://c.saavncdn.com/049/Sleepy-Anime-Lofi-Vol-2-Unknown-2023-20231104021007-500x500.jpg';

  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration, } = context;
   
  const calculateSeekBar = () => {    // expo has asynchronous behaviour, so lags the seekbar in longer audios
    if(playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  useEffect(() => {
    context.loadPreviousAudio(); 
  }, []);

  if(!context.currentAudio)   return null;

  const handlePlayPause = async () => {
    // _________  Play  __________________
    if(context.soundObj === null) {
      const audio  = context.currentAudio;
      const status = await play(context.playbackObj, audio.uri);
      context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: context.currentAudioIndex,
      });
    }
    // _________  Pause  __________________
    if(context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      });
    }
    // _________  Resume  __________________
    if(context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  }

  const handleNext = async () => {
    const {isLoaded}  = await context.playbackObj.getStatusAsync();
    const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
    let audio = context.audioFiles[context.currentAudioIndex + 1];
    let index;
    let status;
    if(!isLoaded && !isLastAudio) {
      index = context.currentAudioIndex + 1;
      status = await play(context.playbackObj, audio.uri);
    }
    if(isLoaded && !isLastAudio) {
      index = context.currentAudioIndex + 1;
      status = await playNext(context.playbackObj, audio.uri);
    }
    if(isLastAudio) {
      index = 0;
      audio = context.audioFiles[index];
      if(isLoaded) {
        status = await playNext(context.playbackObj, audio.uri);
      } else {
        status = await play(context.playbackObj, audio.uri);
      } 
    }    
    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj, 
      soundObj: status, 
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });
    storeAudioForNextOpening(audio, index);
  }

  const handlePrevious = async () => {
    const {isLoaded}  = await context.playbackObj.getStatusAsync();
    const isFirstAudio = context.currentAudioIndex <= 0;
    let audio = context.audioFiles[context.currentAudioIndex - 1];
    let index;
    let status;
    if(!isLoaded && !isFirstAudio) {
      index = context.currentAudioIndex - 1;
      status = await play(context.playbackObj, audio.uri);
    }
    if(isLoaded && !isFirstAudio) {
      index = context.currentAudioIndex - 1;
      status = await playNext(context.playbackObj, audio.uri);
    }
    if(isFirstAudio) {
      index = context.totalAudioCount - 1;
      audio = context.audioFiles[index];
      if(isLoaded) {
        status = await playNext(context.playbackObj, audio.uri);
      } else {
        status = await play(context.playbackObj, audio.uri);
      } 
    }
    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj, 
      soundObj: status, 
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });
    storeAudioForNextOpening(audio, index);
  }

  return (
    <Screen>
        <View style={styles.container}>
            <Text style={styles.audioCount}>{`${context.currentAudioIndex} / ${context.totalAudioCount}`}</Text> 
            <View style={styles.midBannerContainer}>
              { context.isPlaying
                  ? <RotatingImage 
                      source={{uri: tempImg}}
                      // style={styles.imgRotate}
                    />
                  : <Image 
                      // context.isPlaying -->> To know wheater playing audio and can rotate img  
                      source={{uri: tempImg}}
                      style={styles.imgFix}
                    />
              }
            </View>
            <View style={styles.audioPlayerContainer}>
                <Text numberOfLines={1} style={styles.audioTitle}> {context.currentAudio.filename }</Text>
                <Slider
                    style={styles.slideSeekbar}
                    minimumValue={0}
                    maximumValue={1}
                    value={ calculateSeekBar() }
                    minimumTrackTintColor= {color.FONT_MEDIUM}
                    maximumTrackTintColor= {color.ACTIVE_BG}
                />
                <View style={styles.audioControllers}>
                  <PlayerButton iconType='PREV' onPress={handlePrevious} />
                  <PlayerButton 
                    style={{marginHorizontal: 25}} 
                    onPress={handlePlayPause}
                    iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} 
                  />
                  <PlayerButton iconType='NEXT' onPress={handleNext} />
                </View>
            </View>
        </View>
    </Screen>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'seagreen',
      flex: 1,
  },
  audioCount: {
      textAlign: 'right',
      color: color.FONT_LIGHT,
      fontSize: 14,
  },
  imgFix:{
    width: 300,
    height: 300,
    borderRadius: 30,
    // borderRadius: 150,
    // backgroundColor: 'red',
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#515151',
  },
  imgRotate:{
    width: 300,
    height: 300,
    // borderRadius: 30,
    borderRadius: 150,
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#515151',
  },
  midBannerContainer: {
    // backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 15,
  },
  audioPlayerContainer: {
    // backgroundColor: 'skyblue',
    // paddingTop: height - 800,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  audioTitle: {
    // backgroundColor: 'yellow',
    fontSize: 16,
    color: color.FONT,
    padding: 15,
  },
  slideSeekbar: {
    // backgroundColor: 'blue',
    width: width - 40, 
    height: 70, 
    borderRadius: 50,
    padding: 10,
    marginLeft: 15,
  },
  audioControllers: {
    // backgroundColor: 'red',
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: height - 870,
    // paddingTop: height - 800,
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
}); 