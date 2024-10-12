import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Ensure axios is imported

export default function SignupScreen({ navigation }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [message, setMessage] = useState(''); // State to hold the response message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecomstore-7nii.onrender.com/signup', {
        name,
        email,
        password,
      });

      setMessage(response.data.message);
      router.push("/"); // Navigate to the home screen on successful signup
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
        <Text style={styles.loginTitle}>Sign Up</Text>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>
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

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Response Message */}
      {message ? <Text style={styles.messageText}>{message}</Text> : null}

      {/* Login Link */}
      <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
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
    marginTop: 0,
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
  submitButtonText: {
    fontSize: 20,
    backgroundColor: '#354E16',
    color: '#ffffff',
    width: 100,
    textAlign: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
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