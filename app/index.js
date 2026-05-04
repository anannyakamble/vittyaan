import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'
import BackgroundWrapper from '../components/BackgroundWrapper'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter()
  const screenWidth = Dimensions.get('window').width
  const isMobile = screenWidth < 768

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.container,
            {
              flexDirection: isMobile ? 'column' : 'row',

              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {/* LEFT */}
          <View
            style={[
              styles.left,
              {
                width: isMobile ? '100%' : '40%',
                marginRight: isMobile ? 0 : 40,
                marginBottom: isMobile ? 30 : 0,
                alignItems: isMobile ? 'center' : 'flex-start',

              },
            ]}
          >
            <Text style={styles.logo}>VB</Text>
            {/* <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>WELCOME BACK</Text> */}
            <Text
              style={[
                styles.title,
                {
                  fontSize: isMobile ? 28 : 42,
                  textAlign: 'center',
                },
              ]}
            >
              WELCOME BACK
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  textAlign: 'center',
                },
              ]}
            >
              A reliable platform for smarter financial decisions
            </Text>
          </View>

          {/* RIGHT */}
          <View
            style={[
              styles.right,
              { width: isMobile ? '100%' : '35%' },
            ]}
          >
            <View style={styles.card}>
              <Text style={styles.heading}>Login</Text>

              <TextInput placeholder="Email" style={styles.input} />
              <TextInput placeholder="Password" style={styles.input} />

              <Pressable style={styles.button}>
                <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>LOGIN</Text>
              </Pressable>

              <Pressable onPress={() => router.push('/register')}>
                <Text style={styles.link}>
                  Don’t have account? Register
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',   
    padding: 30,
  },

  logo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },

  title: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginBottom: 10,
    letterSpacing: 1,
  },

  subtitle: {
    color: '#ccc',
    fontSize: 16,
    maxWidth: 400,
    textAlign: 'center',
    opacity: 0.8,
  },

  right: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 350,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  heading: {
    color: 'white',
    fontSize: 20,
    marginBottom: 15,
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    color: 'white',
  },

  button: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  link: {
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
})