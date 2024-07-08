import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Animated, Easing, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { RECYCLAGE_IDEA_API } from './../../constants/apiConstants';

export default function ChatBotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour! Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [loading, setLoading] = useState(false);
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const sendMessageToBot = async (message:any) => {
    try {
      const formData = new FormData();
      formData.append('question', message);
  
      const response = await axios.post(RECYCLAGE_IDEA_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Assuming your response object has a property 'idea'
      const botResponse = response.data.idea; // Adjust this based on your API response structure
  
      return botResponse.toString(); // Convert to string if necessary
    } catch (error) {
      console.error("Error sending message to bot: ", error);
      return "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.";
    }
  };
  
  const handleSend = async () => {
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]); // Update state immediately with user message
    setLoading(true);
    setInput('');

    try {
      const botResponse = await sendMessageToBot(input);

      // Update messages state with bot response after API call
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
      setLoading(false); // Set loading to false after receiving response
    } catch (error) {
      console.error("Error handling message send: ", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    if (loading) {
      const animateDots = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot1, {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(dot2, {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(dot3, {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(dot1, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(dot2, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(dot3, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      animateDots();
    }
  }, [loading, dot1, dot2, dot3]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        ref={scrollRef => { if (scrollRef) { scrollRef.scrollToEnd({ animated: true }); } }}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {loading && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={styles.loadingContainer}>
              <Animated.Text style={[styles.loadingDot, { opacity: dot1 }]}>.</Animated.Text>
              <Animated.Text style={[styles.loadingDot, { opacity: dot2 }]}>.</Animated.Text>
              <Animated.Text style={[styles.loadingDot, { opacity: dot3 }]}>.</Animated.Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Tapez votre message..."
        />
        <Button title="Envoyer" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#e1ffc7',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    fontSize: 24,
    color: '#004aad',
    marginHorizontal: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff', // Ensure the background is white
    marginHorizontal: 10, // Add some margin to the sides
    borderRadius: 10, // Add border radius for a more stylish look
    marginBottom: 20, // Add some margin at the bottom to avoid sticking to the edge
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
