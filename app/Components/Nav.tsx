import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

const Nav = () => {
    const router = useRouter();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#44483d', borderRadius: 10, padding: 10 }} className="mt-8">
            <Text  className="text-3xl text-[#dce7c8]">EasyCart</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => router.push("/sell")} className="mx-1">
                    <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 text-sm">Sell</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/cart")} className="mx-1">
                    <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 text-sm">Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/jarvis")} className="mx-1">
                    <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 text-sm">AI</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/landingPage")} className="mx-1">
                    <Text className="bg-[#cdeda3] text-[#102000] rounded-lg p-1 text-sm">Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Nav;