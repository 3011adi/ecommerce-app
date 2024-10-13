import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Buy = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { id } = route.params; // Get 'id' from the route parameters

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ecomstore-7nii.onrender.com/cart/${id}`)
      .then((response) => {
        setCart(response.data); // Set the cart data
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Fetch data when 'id' changes

  return (
    <View style={{ padding: 32 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Buy</Text>
          <Text style={{ fontSize: 18, marginTop: 16 }}>UPI ID: {cart.upi}</Text>
        </View>
      )}
    </View>
  );
};

export default Buy;