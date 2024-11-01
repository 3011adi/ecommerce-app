import { TouchableOpacity, Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://ecomstore-7nii.onrender.com/cart/${id}`);
      if (response.status !== 200) {
        throw new Error('Error deleting item');
      }
      setItems(items.filter(item => item._id !== id));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in');
          router.push("/login");
          return;
        }

        setLoading(true);
        const response = await axios.get(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        setItems(response.data.data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleBuy = (itemId) => {
    router.push({
      pathname: "/buy",
      params: { itemId: itemId }
    });
  };

  return (
    <View className="bg-[#f9faef] flex-1 pt-12">
      <ScrollView className="h-screen">
        <Text className="text-5xl bg-[#f9faef] p-4 text-[#586249] text-center">Cart</Text>
        <View className="flex flex-wrap justify-center bg-[#f9faef]">
          {loading ? (
            <ActivityIndicator size="large" color="#586249" />
          ) : (
            items.map((item) => (
              <View key={item._id} style={{ flexDirection: 'row', alignItems: 'flex-start' }} className="m-3 rounded-lg bg-[#dadbd0] shadow-md">
                <Image source={{ uri: item.image }} style={{ width: 160, height: 160 }} className="m-2 rounded-lg" />
                <View className="p-3 flex-1">
                  <Text className="text-3xl font-bold text-[#2f312a]">{item.object}</Text>
                  <Text className="text-xl text-[#586249] mb-2">₹{item.price}</Text>
                  <Text className="text-sm text-gray-500 mb-4">Seller: {item.seller}</Text>
                  <View className="flex-row">
                    <TouchableOpacity onPress={() => handleBuy(item._id)} className="bg-[#bfcbad] py-2 px-4 rounded-lg mr-2">
                      <Text className="text-center text-[#2a331e] font-medium">Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItem(item._id)} className="bg-[#586249] py-2 px-4 rounded-lg">
                      <Text className="text-center text-white font-medium">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;