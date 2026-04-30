import { ImageBackground, StyleSheet, View } from 'react-native'

export default function BackgroundWrapper({ children }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.bg}
        resizeMode="cover"
      >


        <View style={styles.overlay}>
  <View style={styles.content}>
    {children}
  </View>
</View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',

  justifyContent: 'center',   
  alignItems: 'center',       
},
content: {
  width: '100%',
  maxWidth: 1200,   // fixes stretching
},
})