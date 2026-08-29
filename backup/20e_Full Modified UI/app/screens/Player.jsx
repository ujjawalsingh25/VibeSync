import React, { useContext, useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native'
import Screen from '../components/Screen'
import color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
import {play, pause, playNext, resume, } from '../misc/AudioController'
import { storeAudioForNextOpening } from '../misc/helper';
import { ThemeContext } from '../context/ThemeContext';
// import RotatingImage from '../misc/RotateImage';
//  Dimensions
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
// icons
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const Player = () => {

  const [isRotate, setIsRotate] = useState(false) ;
  // const [lightTheme, setLightTheme] = useState(false);
  const { lightTheme, setLightTheme } = useContext(ThemeContext);
  const tempImg = 'https://c.saavncdn.com/049/Sleepy-Anime-Lofi-Vol-2-Unknown-2023-20231104021007-500x500.jpg';

// _________________  Animation (Rotation)  ____________________________________________________
  const RotatingImage = ({ source }) => {
    const rotateValueHolder = useRef(new Animated.Value(0)).current;
    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.loop(
            Animated.timing(rotateValueHolder, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,  // Ensure this is set to true for rotation
            })
        ).start(); 
    };
    useEffect(() => {
        if(isRotate == true){
          startImageRotateFunction();
        }
        else {
          rotateValueHolder.setValue(0);
          rotateValueHolder.stopAnimation()
        }
      }, [isRotate]);

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
            <Image
                source={source}
                style={styles.imgRotate}
            />
        </Animated.View>
    );
  };
  // ____________________________________________________________________________________


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
        <View style={[styles.container, lightTheme ? styles.lightBg : styles.darkBg]}>
            <Text style={styles.audioCount}>{`${context.currentAudioIndex} / ${context.totalAudioCount}`}</Text> 
            <View style={styles.midBannerContainer}>
              { (context.isPlaying && isRotate) || (!context.isPlaying && isRotate)
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
                <Text numberOfLines={1} style={[styles.audioTitle, lightTheme ? styles.lightThemeFont : styles.darkThemeFont]}> 
                  {context.currentAudio.filename }
                </Text>
                <Slider
                    style={styles.slideSeekbar}
                    minimumValue={0}
                    maximumValue={1}
                    value={ calculateSeekBar() }
                    minimumTrackTintColor= {color.FONT_MEDIUM}
                    maximumTrackTintColor= {color.ACTIVE_BG}
                />
                <View style={styles.audioControllers}>
                  <PlayerButton 
                    iconType='PREV' 
                    onPress={handlePrevious} 
                    style={[lightTheme ? styles.lightThemeFont : styles.darkThemeFont]} 
                  />
                  <PlayerButton 
                    style={[{marginHorizontal: 25}, lightTheme ? styles.lightThemeFont : styles.darkThemeFont]}  
                    onPress={handlePlayPause}
                    iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} 
                  />
                  <PlayerButton 
                    iconType='NEXT' 
                    onPress={handleNext}
                    style={[lightTheme ? styles.lightThemeFont : styles.darkThemeFont]}
                  />
                </View>

                <View style={styles.themeContainer}>
                  <View style={styles.bgTheme}>
                    {lightTheme == false 
                        ? <>
                            <Entypo name="light-up" size={30} color="black" style={styles.rotateImg}
                                onPress={() => setLightTheme(true)} />
                            <Text style={styles.textt}>Light Theme</Text>
                          </> 
                        : <>
                            <MaterialIcons name="dark-mode" size={30} color="black" style={
                              [styles.rotateImg, {
                                color: '#212121',
                                borderColor: '#213121'
                              }]}
                                onPress={() => setLightTheme(false)} />
                            <Text style={styles.textt}>Dark Theme</Text>
                          </> 
                    }
                  </View>
                  <View style={styles.containerRotation}>
                    {isRotate == false 
                        ? <>
                            <FontAwesome6 name="arrows-rotate" size={30} color="black" 
                                style={[styles.rotateImg,{ borderColor: '#213121' }, 
                                  lightTheme ? styles.lightThemeFont : styles.darkThemeFont]}
                                onPress={() => setIsRotate(true)} />
                            <Text style={styles.textt}>Rotate Image</Text>
                          </>
                        : <>
                            <Ionicons name="stop-circle" size={30} color="black" style={styles.rotateImg}
                                onPress={() => setIsRotate(false)} />
                            <Text style={styles.textt}>Stop Rotate</Text>
                          </> 
                    }
                  </View>  
                </View>
            </View>
        </View>
    </Screen>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: { flex: 1, },
  lightBg: { backgroundColor: '#fffefd', }, 
  darkBg: { backgroundColor: color.myBlack, },
  lightThemeFont: { color: color.myBlack, },
  darkThemeFont: { color: color.myWhite, },
  audioCount: {
      textAlign: 'right',
      color: color.FONT_LIGHT,
      paddingRight: width - 420,
      fontSize: 18,
      fontWeight:'bold',
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  themeContainer: {
    // backgroundColor: 'purple',
    // borderWidth: 2,
    width: '90%',
    height: height - 800,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: width - 370,
    paddingRight: width - 380,
    borderRadius: 50,
  },
  textt: {
    color: '#8e8e8e',
    fontWeight: 'bold',
  },
  audioTitle: {
    // backgroundColor: 'yellow',
    fontSize: 16,
    color: color.FONT,
    padding: 15,
    paddingLeft: 20,
  },
  slideSeekbar: {
    // backgroundColor: 'blue',
    // color: 'red',
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
  rotateImg: {
    color: '#c9c9c9',
    // width: width - 700,
    padding: 18,
    borderWidth: 2,
    borderColor: '#c9c9c9',
    borderRadius: 50,
  },
}); 