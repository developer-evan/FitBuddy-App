import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import FitScreen from './screens/FitScreen';
import RestScreen from './screens/RestScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import ChatScreen from './components/ChatScreen';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is signed in, redirect to HomeScreen
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Workout"
              component={WorkoutScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Fit"
              component={FitScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Rest"
              component={RestScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Chat"
              component={ChatScreen}
            />
          </>
        ) : (
          // User is not signed in, show authentication screens
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={Register}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
