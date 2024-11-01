import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import OpenAI from 'openai';
import axios from 'axios';

const Jarvis = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [items, setItems] = useState([]);

  // Fetch items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://ecomstore-7nii.onrender.com/items');
        setItems(response.data.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const client = new OpenAI({ 
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user', message: userInput }];
    setChatHistory(newHistory);

    try {
      // Create a context string from the items data
      const itemsContext = items.map(item => 
        `Item: ${item.object}, Price: ${item.price}, Seller: ${item.seller}`
      ).join('\n');

      const response = await client.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `You are a helpful assistant for an e-commerce store. Here are the available items:\n${itemsContext}\n\nOnly answer questions about these items. If asked about items not in the list, say you can only provide information about the listed items.` 
          },
          { role: "user", content: userInput }
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: "gpt-4o-mini"
      });

      const aiMessage = response.choices[0].message.content;
      setChatHistory([...newHistory, { sender: 'bot', message: aiMessage }]);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([...newHistory, { sender: 'bot', message: 'Error: Failed to get response' }]);
    }
  };

  return (
    <View className="bg-[#dce7c8] h-full pt-12 ">
      <Text className="text-6xl text-center p-5 text-[#4c662b] ">Easy Ai</Text>

      <ScrollView className="px-5 mb-20">
        {chatHistory.map((chat, index) => (
          <View key={index} className="mb-4">
            <Text className="text-[#2f312a] text-lg">
              <Text className="text-[#354e16] font-semibold">{chat.sender === 'user' ? 'You' : 'Easy Ai'}:</Text> {chat.message}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View 
        className="absolute bottom-0 w-full bg-[#f9faef] p-4"
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <TextInput
          className="flex-1 bg-white rounded-xl px-4 py-2 mr-2"
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Ask about our items..."
          multiline
        />

        <TouchableOpacity 
          onPress={sendMessage}
          className="bg-[#cdeda3] px-4 py-2 rounded-xl"
        >
          <Text className="text-[#102000] text-lg">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Jarvis;