import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    // <ImageBackground
    //   source={require('../assets/bg2.jpg')} // Replace with your background image
    //   style={styles.container}
    //   resizeMode="cover"
    // >
      <View style={styles.content}>
        <Text style={styles.title}>Register Here..!!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
            style={styles.textInput}
            autoCorrect={false}
          />
          <TextInput
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
            style={styles.textInput}
            autoCorrect={false}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.registerText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      {/* </View> */}
      </View>
    // </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    paddingTop: 130,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#00B5E2',
  },
  inputContainer: {
    marginTop: 40,
  },
  textInput: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  registerText:{
    fontSize: 15,
    color: '#00B5E2',
    fontWeight: 'bold',
    marginTop: 20,
  }
});