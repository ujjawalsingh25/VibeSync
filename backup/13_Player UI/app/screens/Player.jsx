import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import Screen from '../components/Screen'
import color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
// icons
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const {width} = Dimensions.get('window');
const tempImg = 'https://c.saavncdn.com/049/Sleepy-Anime-Lofi-Vol-2-Unknown-2023-20231104021007-500x500.jpg';

const Player = () => {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>1 / 99</Text> 
                <View style={styles.midBannerContainer}>
                    {/* <FontAwesome5 name="play" size={40} color="black" style={styles.icon} /> */}
                    <Image 
                        source={{uri: tempImg}}
                        style={styles.imgFix}  
                    />
                </View>
                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>Audio Files Name</Text>
                    <Slider
                        style={styles.slideSeekbar}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor= {color.FONT_MEDIUM}
                        maximumTrackTintColor= {color.ACTIVE_BG}
                    />
                    <View style={styles.audioControllers}>
                      <PlayerButton iconType='PREV' />
                      <PlayerButton 
                        style={{marginHorizontal: 25}} 
                        onPress={() => console.log("Playing")}
                        iconType='PLAY' 
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
        marginVertical: 20,
        borderWidth: 5,
        borderColor: '#515151',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingBottom: 20,
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
        borderRadius: 80,
        marginLeft: 15,
      }
}); 