import React, { useContext } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import color from '../misc/Color'
import { ThemeContext } from '../context/ThemeContext';

const Screen = ({children}) => {
  // console.log({children});  
  const { lightTheme, setLightTheme } = useContext(ThemeContext);
  return <View style={[styles.container, lightTheme ? styles.lightBg : styles.darkBg]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  lightBg: {paddingTop: 16, backgroundColor: '#fffefd', }, 
  darkBg: { paddingTop: 18, backgroundColor: color.myBlack, },
});
    