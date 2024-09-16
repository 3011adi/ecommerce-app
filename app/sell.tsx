import { View, Text , TextInput,TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import axios from 'axios';
export default function Sell() {
  const [seller, setSeller] = useState('');
  const [object, setObject] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [upi,setUpi]=useState('');

  const handleSaveBook = () => {
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
        alert('Item added successfully');
        
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
       
        console.log(error);
      });
  };

  return (
    <View className="bg-[#f9faef] h-full"  style={{  justifyContent: 'center', alignItems: 'center' }}>
       <Text className="text-6xl font-semibold bg-[#f9faef] pt-2 p-5 text-[#586249]  ">Sell</Text>
    <View className="bg-[#dadbd0] w-3/4 h rounded-xl" style={{  justifyContent: 'center', alignItems: 'center' }} >
     
      <View className=" bg-[#dce7c8] w-4/5 rounded-xl m-2" style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TextInput className="text-2xl text-[#151e0b]"
          placeholder="Seller"
          value={seller}
          onChangeText={setSeller}
        />
      </View>
      <View className=" bg-[#dce7c8] w-4/5 rounded-xl m-2" style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TextInput className="text-2xl text-[#151e0b]"
          placeholder="Object"
          value={object}
          onChangeText={setObject}
        />
      </View>
      <View className=" bg-[#dce7c8] w-4/5 rounded-xl m-2" style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TextInput className="text-2xl text-[#151e0b]"
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <View className=" bg-[#dce7c8] w-4/5 rounded-xl m-2" style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TextInput className="text-2xl text-[#151e0b]"
          placeholder="Image"
          value={image}
          onChangeText={setImage}
        />
      </View>
      <View className=" bg-[#dce7c8] w-4/5 rounded-xl m-2" style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TextInput className="text-2xl text-[#151e0b]"
          placeholder="UPI ID"
          value={upi}
          onChangeText={setUpi}
        />
      </View>
      
      <TouchableOpacity onPress={handleSaveBook}>
                <Text className="text-2xl bg-[#586249] text-[#ffffff] px-5 py-1  m-3 rounded-3xl">sell</Text>
              </TouchableOpacity>
   
    </View>
    </View>
  );
}