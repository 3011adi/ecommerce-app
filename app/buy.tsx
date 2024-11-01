import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Buy = () => {
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { itemId } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('User not logged in');
          router.push('/login');
          return;
        }

        setLoading(true);
        const response = await axios.get(`https://ecomstore-7nii.onrender.com/cart/${userId}`);
        const item = response.data.data.find(item => item._id === itemId);
        setCartItem(item);
      } catch (error) {
        console.error('Error fetching cart item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItem();
  }, [itemId]);

  const parsePrice = (price) => {
    if (typeof price === 'number') {
      return price.toString();
    }
    if (typeof price === 'string') {
      return price.replace(/[^\d.]/g, '') || '0';
    }
    return '0';
  };

  const openGPay = () => {
    if (!cartItem) return;

    const amount = parsePrice(cartItem.price);
    const upiId = cartItem.upi || '';
    const name = cartItem.seller;
    const note = `Payment for ${cartItem.object}`;

    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    const webUrl = `https://pay.google.com/gp/v/send?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

    Linking.canOpenURL(upiUrl).then(supported => {
      if (supported) {
        Linking.openURL(upiUrl);
      } else {
        Linking.openURL(webUrl);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{ padding: 32 }} className="bg-[#f9faef] min-h-screen">
      {loading ? (
        <ActivityIndicator size="large" color="#586249" />
      ) : (
        <View>
          <Text className="text-center p-6 text-5xl text-[#586249]">Buy Screen</Text>
          {cartItem ? (
            <View className="bg-white p-4 rounded-lg">
              <Text className="text-lg mb-2">Item: {cartItem.object}</Text>
              <Text className="text-lg mb-2">Price: ₹{cartItem.price}</Text>
              <Text className="text-lg mb-2">UPI ID: {cartItem.upi}</Text>
              <Text className="text-lg mb-2">Seller: {cartItem.seller}</Text>
              
              <TouchableOpacity 
                onPress={openGPay}
                className="bg-[#cdeda3] p-4 rounded-lg mt-4"
              >
                <Text className="text-white text-center text-lg">Pay with GPay</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text className="text-lg">Item ID: {itemId}</Text>
              <Text className="text-lg text-red-500">Item not found in cart</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Buy;