import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, ImageBackground } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // navigation.navigate('Dashboard');
    } catch (error) {
      alert("Invalid email or password!!");
    }
  };

  return (
    // <ImageBackground
    //   source={require('../assets/bg2.jpg')} // Replace with your background image
    //   style={styles.container}
    //   resizeMode="cover"
    // >
      <View style={styles.content}>
        {/* <Image
          style={styles.logo}
          source={require('../assets/bg.jpg')}
        /> */}
        <Text style={styles.text}>FitBuddy</Text>
        <Text style={{marginTop:30, marginBottom:50, fontSize:24, fontWeight:'bold'}}>
          Welcome back. Login to continue.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={loginUser}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    // {/* </ImageBackground> */}
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
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // marginTop:30,
    paddingTop:130,
  },
  text: {
    fontSize: 30,
    color: '#00B5E2',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00B5E2',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  button: {
    // marginTop: 30,
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
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#00B5E2',
  },
});