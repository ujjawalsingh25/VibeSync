import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import color from '../misc/Color';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
                    <Text numberOfLines={1} style={styles.title}> {title} </Text>
                    <Text style={styles.timeText}> {convertTime(duration)} </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <SimpleLineIcons 
            onPress={onOptionPress}
            name="options-vertical" 
            size={22} 
            color={color.myBlack} 
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
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 50,
    },
    leftContainer: {
        // backgroundColor: 'red',s
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',   
    },
    rightContainer: {
        // backgroundColor: 'red',
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
        fontSize: 18,
        color: color.FONT,
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