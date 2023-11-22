import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const registerUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://fitness-b9e6c.firebaseapp.com',
      });
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        firstName,
        lastName,
        email,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      alert('Email verification sent');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register Here..!!</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconInput}>
            <Ionicons name="person" size={18} color="#00B5E2" />
            <TextInput
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
              style={styles.textInput}
              autoCorrect={false}
            />
          </View>
          <View style={styles.iconInput}>
            <Ionicons name="person" size={18} color="#00B5E2" />
            <TextInput
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
              style={styles.textInput}
              autoCorrect={false}
            />
          </View>
          <View style={styles.iconInput}>
            <Ionicons name="mail" size={18} color="#00B5E2" />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.passwordContainer}>
            <Ionicons name="lock-closed" size={18} color="#00B5E2" />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              style={styles.passwordInput}
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.showHideButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#00B5E2" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    paddingTop: 130,
  },
  title: {
    fontSize: 23,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#00B5E2',
  },
  inputContainer: {
    marginTop: 40,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  showHideButton: {
    padding: 10,
  },
  button: {
    marginTop: 30,
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
    fontSize: 14,
    color: '#00B5E2',
    // fontWeight: 'bold',
    marginTop: 20,
  },
});
