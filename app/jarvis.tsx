import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Jarvis = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const apiKey = 'AIzaSyAz7Yb5LIGMlkm2zva0-X7tL8fnCEtqOpY';

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user', message: userInput }];
    setChatHistory(newHistory);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userInput }] }],
          }),
        }
      );

      const data = await response.json();
      const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';
      setChatHistory([...newHistory, { sender: 'bot', message: aiMessage }]);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message to Gemini API', error);
      setChatHistory([...newHistory, { sender: 'bot', message: 'Error: Failed to get response' }]);
    }
  };

  return (
    <View className="bg-[#dce7c8] min-h-full pt-12">
      <Text className="text-6xl text-center p-5 text-[#4c662b] font-semibold  ">Jarvis</Text>

      <ScrollView className="px-5">
        {chatHistory.map((chat, index) => (
          <Text className="text-[#2f312a] text-lg" key={index}>
            <Text className="text-[#354e16] font-semibold">{chat.sender}:</Text> {chat.message}
          </Text>
        ))}
      </ScrollView>

      <View className ="text-xl  " style={{  position: 'absolute',bottom:0,flexDirection: 'row',  alignItems: 'center'}}>
        <TextInput  className="bg-[#f9faef] w-3/5 rounded-xl m-2 mx-6 p-0.5"
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message"
        />

        <TouchableOpacity onPress={sendMessage}>
          <Text className="bg-[#cdeda3] text-[#102000] text-xl p-1 rounded-3xl">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Jarvis;