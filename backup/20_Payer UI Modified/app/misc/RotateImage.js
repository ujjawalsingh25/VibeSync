import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

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
        startImageRotateFunction();
    }, []);

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

const styles = StyleSheet.create({
  imgRotate:{
    width: 300,
    height: 300,
    // borderRadius: 30,
    borderRadius: 150,
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#515151',
  },
});

export default RotatingImage;
