import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("Login Successful!!");
    } catch (error) {
      alert("Invalid email or password!!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>FitBuddy</Text>
        <Text style={{ marginTop: 30, marginBottom: 50, fontSize: 24 }}>
          Welcome back. Login to continue.
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={18} color="#00B5E2" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.passwordContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={18} color="#00B5E2" />
          </View>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showHideButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#00B5E2" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    paddingTop: 130,
  },
  text: {
    fontSize: 30,
    color: '#00B5E2',
    marginBottom: 20,
    // fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#000',
  },
  
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#000',
  },
  showHideButton: {
    padding: 10,
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: '#00B5E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    // fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    // fontWeight: 'bold',
    fontSize: 14,
    color: '#00B5E2',
  },
});
