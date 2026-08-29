import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import color from '../misc/Color';

const AudioListItem = () => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>A</Text>
        </View>
        <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>Title of the song</Text>
            <Text style={styles.timeText}>00:00</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
          <SimpleLineIcons name="options-vertical" size={22} color={color.myBlack} />
      </View>

    </View>
    <View style={styles.seperator} />
    </>
  );
}

export default AudioListItem

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
        // backgroundColor: 'yellow',
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
    seperator: {
        backgroundColor: '#333',
        width: width - 80,
        height: 0.5,
        marginTop: 9,
        opacity: 0.3,
        alignSelf: 'center',
    }
})