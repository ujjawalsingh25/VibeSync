import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import Screen from '../components/Screen'
import color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
import {play, pause, playNext, resume, } from '../misc/AudioController'
// icons
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { storeAudioForNextOpening } from '../misc/helper';

// const [isAudioPlaying, setIsAudioPlaying] = useState(false)
// const [isRotate, setIsRotate] = useState(false) 
// const [lightTheme, setLightTheme] = useState(false)

const {width} = Dimensions.get('window');
const tempImg = 'https://c.saavncdn.com/049/Sleepy-Anime-Lofi-Vol-2-Unknown-2023-20231104021007-500x500.jpg';

const Player = () => {

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
    });
    storeAudioForNextOpening(audio, index);
  }

  return (
    <Screen>
        <View style={styles.container}>
            <Text style={styles.audioCount}>{`${context.currentAudioIndex} / ${context.totalAudioCount}`}</Text> 
            <View style={styles.midBannerContainer}>
                <Image 
                    // context.isPlaying -->> To know wheater playing audio and can rotate img  
                    source={{uri: tempImg}}
                    style={styles.imgFix}  
                />
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
    width: 250,
    height: 250,
    borderRadius: 30,
    // borderRadius: 150,
    // backgroundColor: 'red',
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#515151',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  audioPlayerContainer: {
    // backgroundColor: 'skyblue',
  },
  midBannerContainer: {
    // backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 15,
  },
  audioTitle: {
    fontSize: 16,
    color: color.FONT,
    padding: 15,
  },
  audioControllers: {
    // backgroundColor: 'red',
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  slideSeekbar: {
    // backgroundColor: 'blue',
    width: width - 40, 
    height: 70, 
    borderRadius: 50,
    padding: 10,
    marginLeft: 15,
  },
}); 