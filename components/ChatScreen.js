import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState({ firstName: '' });
    const navigation = useNavigation();

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

  useEffect(() => {
    const chatRef = firebase.firestore().collection('chat');
    const unsubscribe = chatRef.orderBy('timestamp').onSnapshot((querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const isCurrentUser = (sender) => sender === name.firstName;

  const renderMessageItem = ({ item }) => {
    const isCurrentUserMessage = isCurrentUser(item.sender);

    const messageContainerStyle = isCurrentUserMessage
      ? styles.currentUserMessage
      : styles.otherUserMessage;

    const profileCircleStyle = {
      backgroundColor: isCurrentUserMessage
        ? getUserBackgroundColor(name.firstName)
        : getUserBackgroundColor(item.sender),
      borderColor: isCurrentUserMessage ? '#2980b9' : '#bdc3c7',
    };

    return (
      <View style={[styles.messageContainer, messageContainerStyle]}>
        <View style={[styles.profileCircle, profileCircleStyle]}>
          <Text style={styles.profileText}>{item.sender.charAt(0)}</Text>
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  const getUserBackgroundColor = (userName) => {
    const charCodeSum = userName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = charCodeSum % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
        return ''; // Return an empty string if the timestamp is null or toDate is not available
    }

    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
};


  const handleSend = () => {
    if (newMessage.trim() === '' || !name.firstName) return;

    const chatRef = firebase.firestore().collection('chat');
    chatRef.add({
      text: newMessage,
      sender: name.firstName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <View style={styles.container}>
         <StatusBar barStyle="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessageItem}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#3498db" />
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
    
  },
  headerText: {
    fontSize: 18,
    marginLeft: 16,
   
  },
  
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    maxWidth: '70%', // Adjusted width for better differentiation
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db', // Background color for logged user's messages
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#daefda', // Background color for received messages
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    // borderWidth: 2, // Add border for a circled appearance
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  messageContent: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#b8b8b8',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
