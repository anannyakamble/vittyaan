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
import { useState } from 'react'

export default function Register() {
  const router = useRouter()
  const screenWidth = Dimensions.get('window').width
  const isMobile = screenWidth < 768

  // 👇 STEP CONTROL (IMPORTANT)
  const [step, setStep] = useState(1)

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.container,
            { flexDirection: isMobile ? 'column' : 'row' ,
            justifyContent: isMobile ? 'center' : 'flex-start'},
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
            <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>
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
              <Text style={styles.heading}>Register</Text>

              {/* 🔥 STEP 1 */}
              {step === 1 && (
                <>
                  <TextInput placeholder="First Name" style={styles.input} />
                  <TextInput placeholder="Last Name" style={styles.input} />
                  <TextInput placeholder="Email" style={styles.input} />
                  <TextInput placeholder="Phone" style={styles.input} />

                  <Pressable
                    style={styles.button}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.buttonText}>Next</Text>
                  </Pressable>
                </>
              )}

              {/* 🔥 STEP 2 */}
              {step === 2 && (
                <>
                  <TextInput
                    placeholder="DD/MM/YYYY"
                    style={styles.input}
                  />

                  <View style={styles.genderRow}>
                    <Text style={styles.gender}>Male</Text>
                    <Text style={styles.gender}>Female</Text>
                    <Text style={styles.gender}>Other</Text>
                  </View>

                  <TextInput
                    placeholder="Referral Code (Optional)"
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Enter Your Password"
                    secureTextEntry
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Confirm Your Password"
                    secureTextEntry
                    style={styles.input}
                  />

                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Pressable
                      style={[styles.button, { flex: 1 }]}
                      onPress={() => setStep(1)}
                    >
                      <Text style={styles.buttonText}>Back</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, { flex: 1 }]}
                      onPress={() => alert('Account Created 🚀')}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </Pressable>
                  </View>
                </>
              )}

              <Pressable onPress={() => router.push('/')}>
                <Text style={styles.link}>
                  Already have account? Login
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
  width: '90%',
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
    width: '100%',
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

  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },

  gender: {
    color: 'white',
  },
})