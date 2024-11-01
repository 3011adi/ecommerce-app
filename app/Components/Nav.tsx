import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from "expo-router";

const Nav = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <View style={{ 
            backgroundColor: '#44483d', 
            borderRadius: 10, 
            padding: 15, 
            marginHorizontal: 10,
            marginVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5
        }}>
            <TouchableOpacity onPress={toggleDropdown} style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                <Text style={{ 
                    fontSize: 26, 
                    color: '#dce7c8', 
                    fontWeight: 'bold' 
                }}>
                    EasyCart
                </Text>
                <Text style={{ 
                    fontSize: 18, 
                    color: '#dce7c8' 
                }}>
                    {isDropdownVisible ? '▲' : '▼'}
                </Text>
            </TouchableOpacity>

            {isDropdownVisible && (
                <Animated.View style={{ 
                    marginTop: 10, 
                    backgroundColor: '#f9faef', 
                    borderRadius: 10, 
                    padding: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity 
                        onPress={() => {
                            setDropdownVisible(false);
                            router.push('/sell');
                        }} 
                        style={{ 
                            backgroundColor: '#cdeda3', 
                            borderRadius: 20, 
                            paddingVertical: 6, 
                            paddingHorizontal: 12, 
                            marginVertical: 5,
                            width: '48%' 
                        }}
                    >
                        <Text style={{ 
                            color: '#102000', 
                            fontSize: 14, 
                            fontWeight: '500', 
                            textAlign: 'center'
                        }}>
                            Sell
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setDropdownVisible(false);
                            router.push('/cart');
                        }} 
                        style={{ 
                            backgroundColor: '#cdeda3', 
                            borderRadius: 20, 
                            paddingVertical: 6, 
                            paddingHorizontal: 12, 
                            marginVertical: 5,
                            width: '48%' 
                        }}
                    >
                        <Text style={{ 
                            color: '#102000', 
                            fontSize: 14, 
                            fontWeight: '500', 
                            textAlign: 'center'
                        }}>
                            Cart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setDropdownVisible(false);
                            router.push('/jarvis');
                        }} 
                        style={{ 
                            backgroundColor: '#cdeda3', 
                            borderRadius: 20, 
                            paddingVertical: 6, 
                            paddingHorizontal: 12, 
                            marginVertical: 5,
                            width: '48%' 
                        }}
                    >
                        <Text style={{ 
                            color: '#102000', 
                            fontSize: 14, 
                            fontWeight: '500', 
                            textAlign: 'center'
                        }}>
                            Easy AI
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            setDropdownVisible(false);
                            router.push('/landingPage');
                        }} 
                        style={{ 
                            backgroundColor: '#cdeda3', 
                            borderRadius: 20, 
                            paddingVertical: 6, 
                            paddingHorizontal: 12, 
                            marginVertical: 5,
                            width: '48%' 
                        }}
                    >
                        <Text style={{ 
                            color: '#102000', 
                            fontSize: 14, 
                            fontWeight: '500', 
                            textAlign: 'center'
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

export default Nav;