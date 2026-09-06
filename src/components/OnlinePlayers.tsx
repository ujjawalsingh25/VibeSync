import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useToggleThemeStore } from '../../store/toggleThemeStore';

interface OnlinePlayersProps {
  playerName: string;
  playerImg: string;
  playerLink: string;
  onPress: (link: string) => void;
}

const OnlinePlayers = ({playerName, playerImg, playerLink, onPress} : OnlinePlayersProps) => {
    // let colorTheme = "light";
    const colorTheme = useToggleThemeStore((state) => state.colorTheme);

    return (
        <>
            <View style={styles.container}>
                <Pressable 
                    onPress={() => onPress(playerLink)}
                    style={styles.playerButton}
                >
                    <View style={styles.playerContainer}>
                        <Image 
                            source={{ uri: playerImg }}
                            style={styles.playerImg}
                        />
                    </View>
                    <Text style={[
                        styles.playerName,
                        {color: colorTheme === "dark" ? "#E0E0E0" : "black"}
                    ]}>{playerName}</Text>
                </Pressable>
            </View>
        </>
    )
}

export default OnlinePlayers;

const styles = StyleSheet.create({
    container: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,        
    },
    playerContainer: {
        height: 120,
        width: 120,
    },
    playerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerImg: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain',
        marginLeft: 'auto', 
        marginRight: 'auto',
        borderRadius: 40,
    },
    playerName: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: 8,
        // color: '#E0E0E0'    // Dark theme
    },
});