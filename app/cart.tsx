import { TouchableOpacity, Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    setLoading(true);
    axios
      .get('https://ecomstore-7nii.onrender.com/cart')
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleBuy = (itemId) => {
    router.push({
      pathname: "/buy",
      params: { itemId: itemId }
    });
  };

  return (
       <View className="bg-[#f9faef] flex-1 pt-12">
      <ScrollView className="h-screen ">
        <Text className="text-5xl bg-[#f9faef] p-2 text-[#586249] px-8">Cart</Text>
        <View className="grid grid-cols-2 items-center justify-center  bg-[#f9faef]">
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            items.map((item) => (
              <View key={item._id} style={{ flexDirection: 'row', alignItems: 'top' }} className="m-3 rounded-lg bg-[#dadbd0]">
                <Text className="absolute z-20 bg-[#cdeda3] text-[#102000] text-lg rounded-lg p-1 text-[#102000]">{item.seller}</Text>
                <Image source={{ uri: item.image }} style={{ width: 160, height: 160 }} className="m-2 rounded-lg" />
                <View className="p-3">
                  <Text className="text-3xl text-[#2f312a]">{item.object}</Text>
                  <Text className="text-xl text-[#586249]">{item.price}</Text>
                  <TouchableOpacity onPress={() => handleBuy(item._id)}>
                    <Text className="text-lg text-[#2a331e] bg-[#bfcbad] px-3 m-2 w-16 rounded-3xl">buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteItem(item._id)}>
                    <Text className="text-lg bg-[#586249] text-[#ffffff] px-1 mx-2 w-16 rounded-3xl">delete</Text>
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

export default Cart;