import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
const router= useRouter()
  return (
    <View style={styles.container}>

      {/* Back Button */}
     
      {/* Title */}
      <View style={styles.logoContainer}>
        <Text style={styles.loginTitle}>Forgot Password</Text>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={() => router.push("/")} >
      <Text className="text-2xl bg-[#354E16] text-[#ffffff] w-32 text-center p-1 mx-2 rounded-3xl">submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#DADBD0',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#A8A8A9',
    padding: 10,
    borderRadius: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 100,
    height: 90,
    marginTop:17, 
  },
  loginTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  inputContainer: {
    width: '100%',
    margintop: 0,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  submitButtonContainer: {
    width: '60%',
    marginTop: 50,
    borderRadius: 10,
  },
  submitButton: {
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    backgroundColor: '#354E16',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'black',
    marginTop: 20,
  },
});