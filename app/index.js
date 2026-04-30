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
            { flexDirection: isMobile ? 'column' : 'row' ,
              justifyContent: isMobile ? 'center' : 'flex-start',
            },
          ]}
        >
          {/* LEFT */}
          <View
            style={[
              styles.left,
              { width: isMobile ? '100%' : '60%',
                 marginBottom: isMobile ? 30 : 0, 
               },
            ]}
          >
            <Text style={styles.logo}>VB</Text>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subtitle}>
              A reliable platform for smarter financial decisions
            </Text>
          </View>

          {/* RIGHT */}
          <View
            style={[
              styles.right,
              { width: isMobile ? '100%' : '40%' },
            ]}
          >
            <View style={styles.card}>
              <Text style={styles.heading}>Login</Text>

              <TextInput placeholder="Email" style={styles.input} />
              <TextInput placeholder="Password" style={styles.input} />

              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
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
  },

  left: {
  justifyContent: 'center',
  padding: Dimensions.get('window').width < 768 ? 20 : 30,
},

  logo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },

  title: {
  color: 'white',
  fontSize: Dimensions.get('window').width < 768 ? 28 : 36,
  fontWeight: 'bold',
  flexWrap: 'wrap',
  marginBottom: 10,
},

  subtitle: {
    color: '#ccc',
    fontSize: 14,
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
  },

  buttonText: {
    color: 'white',
  },

  link: {
    color: '#ccc',
    marginTop: 10,
    textAlign: 'center',
  },
})