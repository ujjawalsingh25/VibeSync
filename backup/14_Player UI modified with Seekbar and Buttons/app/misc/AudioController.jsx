// Play Audio
export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync(
            {uri}, 
            {shouldPlay: true},
        );
    } catch (error) {
        console.log("Error inside Play function in mics/AudioController", error.message );        
    }
}

// Pause Audio
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync({
            shouldPlay: false,
        });
    } catch (error) {
        console.log("Error inside Pause function in mics/AudioController", error.message );        
    }
}

// Resume Audio
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync();
    } catch (error) {
        console.log("Error inside Resume function in mics/AudioController", error.message );        
    }
}

// Select Another Audio
export const playNext = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync();       // to play another audio stop current audio
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri);
    } catch (error) {
        console.log("Error inside playNext function in mics/AudioController", error.message );
    }
}
