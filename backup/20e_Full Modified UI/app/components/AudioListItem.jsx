import React, { useContext } from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import color from '../misc/Color';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ThemeContext } from '../context/ThemeContext';

const getThumbnailText = (filename) => filename[0]      // return Song-Title first-Name 
const convertTime = minutes => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
        const sec = Math.ceil((60 * percent) / 100);
        if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
        }
        if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
        }  
        if (sec < 10) {
        return `${minute}:0${sec}`;
        }
        return `${minute}:${sec}`;
    }
};

const renderPlayPauseIcon = isPlaying => {
    if(isPlaying)   return <MaterialIcons name="pause" size={24} color={color.ACTIVE_FONT} />        // pause icon
    else    return  <FontAwesome6 name="play" size={24} color={color.ACTIVE_FONT} />                // play icon
} 

const AudioListItem = ({title, isPlaying, duration, onOptionPress, onAudioPress, activeListItem }) => {
    
  const { lightTheme, setLightTheme } = useContext(ThemeContext);
  return (
    <>
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
            <View style={styles.leftContainer}>
                <View style={[styles.thumbnail, {backgroundColor: activeListItem ? color.ACTIVE_BG : color.FONT_LIGHT}]}>
                    <Text style={styles.thumbnailText}> 
                        {activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title) }
                    </Text>
                </View>
                <View style={styles.titleContainer}> 
                    <Text numberOfLines={1} style={[styles.title, lightTheme ? styles.lightThemeFont : styles.darkThemeFont]}> 
                        {title} 
                    </Text>
                    <Text style={styles.timeText}> {convertTime(duration)} </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <SimpleLineIcons 
            onPress={onOptionPress}
            name="options-vertical" 
            size={22} 
            color={lightTheme ? color.myBlack : color.myWhite} 
            style={styles.optionIcon}
          />
        </View>
    </View>
    <View style={styles.seperator} />
    </>
  );
}

export default AudioListItem;

const {width} = Dimensions.get('window')        // get width of window
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'seagreen',
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 50,
        // padding: 20,
    },
    lightBg: { backgroundColor: '#fffefd', }, 
    darkBg: { backgroundColor: color.myBlack, },
    lightThemeFont: { color: color.myBlack, },
    darkThemeFont: { color: color.myWhite, },
    
    leftContainer: {
        // backgroundColor: 'skyblue',
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',   
    },
    rightContainer: {
        // backgroundColor: 'orange',
        // borderRadius: 30,
        flexBasis: 50,
        marginTop: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        backgroundColor: color.FONT_LIGHT,
        height: 52, 
        marginTop: 5,
        flexBasis: 52,                      // provide width
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    thumbnailText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: color.FONT,
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    title: {
        // backgroundColor: 'red',
        fontSize: 18,
        color: color.myWhite,
    },
    timeText: {
        fontSize: 15,
        color: color.FONT_LIGHT,    
        fontWeight: '500',
    },
    optionIcon: {
        // backgroundColor: 'yellow',
        padding: 10,
    },
    seperator: {
        backgroundColor: '#333',
        width: width - 80,
        height: 0.5,
        marginTop: 9,
        opacity: 0.3,
        alignSelf: 'center',
    }
})