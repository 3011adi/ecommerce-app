import React from 'react';
import { View, Text ,TouchableOpacity} from 'react-native';
import { useRouter } from "expo-router";
const Nav = () => {
    const router = useRouter();
  return (
    <View style={{ flexDirection: 'row',  alignItems: 'center', backgroundColor: '#44483d', borderRadius: 10, margin: 10 }} className="mt-12">
    <Text onPress={() => router.push("/landingPage")} className="text-4xl p-2 text-[#dce7c8]">Easy cart</Text>
    <TouchableOpacity onPress={() => router.push("/sell")}>
      <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 m-2 text-xl">Sell</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.push("/cart")}>
      <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1  text-xl">cart</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.push("/jarvis")}>
      <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 mx-3 text-xl">AI</Text>
    </TouchableOpacity>
  </View>
  );
};

export default Nav;