import { Text, View ,Image,ScrollView,ActivityIndicator,TouchableOpacity,Button} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "./Components/Nav";
const index = () => {
  
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
      const newCartItem = {
        seller: item.seller,
        object: item.object,
        price: item.price,
        image: item.image,
        upi: item.upi,
      };

      const response = await axios.post('https://ecomstore-7nii.onrender.com/cart', newCartItem);
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <View className="bg-[#f9faef] mb-28 "> 
    <Nav/>
    <ScrollView>
      
      <Text className="text-5xl bg-[#f9faef] p-2 text-[#586249] px-8">Shop</Text>
      
    <View className=" grid grid-cols-2 items-center justify-center bg-[#f9faef]">
      
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        items.map((item) => (
          <View key={item._id} style={{flexDirection: 'row', alignItems: 'top'}} className=" m-3   rounded-lg  bg-[#dadbd0] ">
            <Text className="absolute z-20 bg-[#cdeda3] text-[#102000] text-lg rounded-lg p-1 text-[#102000]">{item.seller}</Text>
            <Image source={{ uri: item.image }} style={{width: 160, height: 160}} className="m-2 rounded-lg" />
            <View className=" p-3">
              <Text className=" text-3xl text-[#2f312a]">{item.object}</Text>
              <Text className="text-xl text-[#586249]">{item.price}</Text>
              <TouchableOpacity onPress={() => addToCart(item)} className="pt-8">
                <Text className="text-lg text-[#2a331e] bg-[#bfcbad]  p-1 m-2 rounded-lg">Add to cart</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        ))
      )}
    </View>
  </ScrollView>
  </View>
  );}
export default index