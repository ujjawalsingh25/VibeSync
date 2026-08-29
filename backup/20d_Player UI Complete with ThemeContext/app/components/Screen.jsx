import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import color from '../misc/Color'

const Screen = ({children}) => {
  // console.log({children});  
  return <View style={styles.container}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 12,
    },
});
    