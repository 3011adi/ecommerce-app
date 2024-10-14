import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const Buy = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const { itemId } = useLocalSearchParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ecomstore-7nii.onrender.com/cart/${itemId}`)
      .then((response) => {
        setCart(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [itemId]);

  const parsePrice = (price) => {
    if (typeof price === 'number') {
      return price.toString();
    }
    if (typeof price === 'string') {
      const numericValue = price.replace(/[^\d.]/g, '');
      return numericValue || '0';
    }
    return '0';
  };

  const openGPay = () => {
    const amount = parsePrice(cart.price);
    const upiId = cart.upi || '';
    const name =  cart.seller; // Replace with your actual merchant name
        const note = `Payment for ${cart.object}`; // You can customize this

    // Construct the UPI payment URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

    // Construct the Google Pay web URL as fallback
    const webUrl = `https://pay.google.com/gp/v/send?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

    // Try to open the GPay app first
    Linking.canOpenURL(upiUrl).then(supported => {
      if (supported) {
        Linking.openURL(upiUrl);
      } else {
        // If GPay app is not installed, open the web URL
        Linking.openURL(webUrl);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{ padding: 32 }} className="bg-[#f9faef] min-h-screen">
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <Text className="text-center p-6 text-5xl  text-[#586249]">Buy</Text>
          <Text className="text-lg">Price: {cart.price}</Text>
          <Text className="text-lg">UPI ID: {cart.upi}</Text>
          <TouchableOpacity 
            onPress={openGPay}
            
                        style={{
              backgroundColor: '#cdeda3',
              
              padding: 10,
              borderRadius: 20,
              marginTop: 40, // Ensure marginTop is correctly applied
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Pay with GPay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Buy;