import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import axios from 'axios'; // Ensure axios is imported
import AsyncStorage from '@react-native-async-storage/async-storage';  // Add this import at the top

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Changed from name to email
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecomstore-7nii.onrender.com/signup/login', {
        email,
        password,
      });

      setMessage(response.data.message);
      await AsyncStorage.setItem('userId', response.data.user.id.toString());  // Store userId using AsyncStorage
      router.push("/"); // Navigate to the home screen on successful login
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.loginTitle}>Login</Text>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Ionicons name={secureTextEntry ? "eye-off-outline" : "eye-outline"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Response Message */}
      {message ? <Text style={styles.messageText}>{message}</Text> : null}

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push("/SignupScreen")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => router.push("/ForgotPasswordScreen")}>
        <Text style={styles.linkText}>Forgot your password?</Text>
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
    width: 110,
    height: 85,
  },
  loginTitle: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  inputContainer: {
    width: '100%',
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
  messageText: {
    color: 'red',
    marginTop: 20,
  },
  linkText: {
    color: 'black',
    marginTop: 20,
  },
});