import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import FitnessCards from '../components/FitnessCards';
import { Ionicons } from '@expo/vector-icons';
import { FitnessItems } from '../Context';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';

const HomeScreen = () => {
  const [showIcon, setShowIcon] = useState(false);
  const { calories, minutes, workout } = useContext(FitnessItems);
  const navigation = useNavigation();
  const [name, setName] = useState({});
 
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleChatNavigation = () => {
    navigation.navigate('Chat');
  };
  const actions = [
    {
      text: 'Join Our Community',
      icon: <Ionicons name="chatbubble-outline" size={24} color="white" />,
      name: 'goToChat',
      position: 1,
    },
    // facebook 
    
    // Add more actions if needed
  ];

  const handleActionPress = (name) => {
    if (name === 'goToChat') {
      handleChatNavigation();
    }
    // Handle other actions if needed
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: '#000000d7', paddingTop: 40, paddingHorizontal: 20, height: 160, width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Welcome back {name.firstName} !</Text>

          <View style={{ flexDirection: 'row' }}>
            {/* Dark Mode  */}
            <TouchableOpacity onPress={() => setShowIcon(!showIcon)}>
              {showIcon ? <Ionicons name="sunny" size={24} color="white" /> : <Ionicons name="moon" size={24} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Ionicons name="log-out-outline" size={24} color="white" onPress={handleLogout} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Row  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
          {/* First Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{calories.toFixed(2)}</Text>
            <Text>KCAL</Text>
          </View>

          {/* Second Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>

          {/* Third Card  */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{minutes}</Text>
            <Text>MINUTES</Text>
          </View>
        </View>
      </View>
      {/* Fitness Cards  */}
      <FitnessCards />

      {/* Floating Action Button */}
     
    </ScrollView>
    <FloatingAction
        actions={actions}
        onPressItem={(name) => handleActionPress(name)}
        color="#00A3E0"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: '#ffffff',
    width: '32%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
