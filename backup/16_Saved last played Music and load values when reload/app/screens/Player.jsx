import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import Screen from '../components/Screen'
import color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
// icons
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
                  <PlayerButton iconType='PREV' />
                  <PlayerButton 
                    style={{marginHorizontal: 25}} 
                    onPress={() => console.log("Playing")}
                    iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} 
                  />
                  <PlayerButton iconType='NEXT' />
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