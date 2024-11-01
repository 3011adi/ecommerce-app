import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useState } from 'react';
import axios from 'axios';

export default function Sell() {
  const [seller, setSeller] = useState('');
  const [object, setObject] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [upi, setUpi] = useState('');

  const handleSaveBook = () => {
    if (!seller || !object || !price || !image || !upi) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const data = {
      seller,
      object,
      price,
      image,
      upi
    };
    setLoading(true);
    axios
      .post('https://ecomstore-7nii.onrender.com/items', data)
      .then(() => {
        setLoading(false);
        Alert.alert('Success', 'Item added successfully');
        setSeller('');
        setObject('');
        setPrice('');
        setImage('');
        setUpi('');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', 'Failed to add item');
        console.log(error);
      });
  };

  return (
    <View className="bg-[#f9faef] flex-1 justify-center items-center px-4">
      <Text className="text-5xl  text-[#586249] mb-6">Sell Your Item</Text>
      <View className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        {loading ? (
          <ActivityIndicator size="large" color="#586249" />
        ) : (
          <>
            <View className="bg-[#dce7c8] w-full rounded-xl mb-4 p-3">
              <TextInput
                className="text-xl text-[#151e0b]"
                placeholder="Seller Name"
                value={seller}
                onChangeText={setSeller}
              />
            </View>
            <View className="bg-[#dce7c8] w-full rounded-xl mb-4 p-3">
              <TextInput
                className="text-xl text-[#151e0b]"
                placeholder="Item Name"
                value={object}
                onChangeText={setObject}
              />
            </View>
            <View className="bg-[#dce7c8] w-full rounded-xl mb-4 p-3">
              <TextInput
                className="text-xl text-[#151e0b]"
                placeholder="Price (₹)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <View className="bg-[#dce7c8] w-full rounded-xl mb-4 p-3">
              <TextInput
                className="text-xl text-[#151e0b]"
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
              />
            </View>
            <View className="bg-[#dce7c8] w-full rounded-xl mb-4 p-3">
              <TextInput
                className="text-xl text-[#151e0b]"
                placeholder="UPI ID"
                value={upi}
                onChangeText={setUpi}
              />
            </View>
            <TouchableOpacity onPress={handleSaveBook} className="bg-[#586249] py-3 rounded-full">
              <Text className="text-xl text-center text-white font-medium">Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}