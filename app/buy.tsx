import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const Buy = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ecomstore-7nii.onrender.com/cart/${id}`)
      .then((response) => {
        console.log('Response data:', response.data);
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching item data:', error);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = () => {
    // Implement purchase logic here
    alert('Purchase completed!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : item ? (
        <View>
          <Text style={styles.title}>Buy Item</Text>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.itemName}>{item.object}</Text>
          <Text style={styles.itemPrice}>Price: ${item.price}</Text>
          <Text style={styles.seller}>Seller: {item.seller}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
            <Text style={styles.buyButtonText}>Confirm Purchase</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No item data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9faef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#586249',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2f312a',
  },
  itemPrice: {
    fontSize: 18,
    marginBottom: 8,
    color: '#586249',
  },
  seller: {
    fontSize: 16,
    marginBottom: 16,
    color: '#586249',
  },
  buyButton: {
    backgroundColor: '#cdeda3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#102000',
  },
});

export default Buy;