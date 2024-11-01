import { Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "./Components/Nav";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://ecomstore-7nii.onrender.com/items')
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addToCart = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        router.push("/login");
        return;
      }

      const newCartItem = {
        seller: item.seller,
        object: item.object,
        price: item.price,
        image: item.image,
        upi: item.upi,
      };

      const response = await axios.post(`https://ecomstore-7nii.onrender.com/cart/${userId}`, newCartItem);
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <View className="flex-1 bg-[#f9faef]">
      <View className="pt-12">
        <Nav />
      </View>
      <ScrollView>
       
        <View className="flex flex-wrap justify-center">
          {loading ? (
            <ActivityIndicator size="large" color="#586249" />
          ) : (
            items.map((item) => (
              <View 
                key={item._id} 
                className="bg-white m-3 rounded-lg shadow-lg overflow-hidden w-[90%] max-w-sm"
              >
               <View className="flex items-center justify-center ">
                <Image 
                  source={{ uri: item.image }} 
                  style={{ width: '80%', height: 200 }} 
                  className="rounded-t-lg flex m-1 "
                />
                </View>
                <View className="p-4">
                  <Text className="text-lg font-bold text-[#2f312a]">{item.object}</Text>
                  <Text className="text-md text-[#586249] mb-2">₹{item.price}</Text>
                  <Text className="text-sm text-gray-500 mb-4">Seller: {item.seller}</Text>
                  <TouchableOpacity 
                    onPress={() => addToCart(item)} 
                    className="bg-[#cdeda3] py-2 rounded-lg"
                  >
                    <Text className="text-center text-[#102000] font-medium">Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;