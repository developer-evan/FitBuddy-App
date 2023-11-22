import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get();

        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const chatRef = firebase.firestore().collection('chat');
    const unsubscribe = chatRef
      .orderBy('timestamp', 'asc')
      .onSnapshot((querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, []);

  const isOwnMessage = (sender) => sender === name.firstName;

  const generateAvatarColor = (name) => {
    const colors = ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#673AB7', '#009688', '#FF9800'];
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % colors.length;
    return colors[colorIndex];
  };

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const chatRef = firebase.firestore().collection('chat');
    chatRef.add({
      text: newMessage,
      sender: { firstName: name.firstName, lastName: name.lastName},
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setNewMessage('');
  };

  const handleDelete = async (messageId) => {
    try {
      const chatRef = firebase.firestore().collection('chat');
      await chatRef.doc(messageId).delete();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return '';
    }

    const date = timestamp.toDate();
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              isOwnMessage(item.sender) ? styles.ownMessageContainer : styles.incomingMessageContainer,
            ]}
          >
            <View
              style={[
                styles.avatarContainer,
                { backgroundColor: generateAvatarColor(item.sender) },
              ]}
            >
              <Text style={styles.avatarText}>{item.sender[0]}</Text>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.sender}>{item.sender}:</Text>
              <Text>{item.text}</Text>
              <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
              {/* {isOwnMessage(item.sender) && (
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-bin-outline" size={20} color="red" style={styles.deleteIcon} />
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        )}
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
            <Ionicons name="send" size={24} color="#00A3E0" />
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
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#daefda',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    
  },
  headerText: {
    fontSize: 18,
    marginLeft: 16,
   
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
  },
  messageContent: {
    flex: 1,
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  incomingMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5E5',
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  deleteIcon: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    // backgroundColor: '#00A3E0',
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
