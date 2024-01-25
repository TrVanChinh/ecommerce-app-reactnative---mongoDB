import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import React, { useEffect, useState,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwtDecode from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";
import { API_BASE_URL } from "../Locahost";

const ProductItem = ({navigation, item }) => {
  const {userId, setUserId} = useContext(UserType)

  const handleAddCart = async (product) => {
    const token = await AsyncStorage.getItem("authToken")
    //fix 0, _jwtDecode.default is not a function (it is undefined)
    jwtDecode = require('jwt-decode');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; 
    setUserId(userId)
    console.log(userId)
    try {
      const response = await axios.post(`${API_BASE_URL}/carts/addProduct/${userId}`, { product });
      alert("Thêm sản phẩm vào giỏ hàng thành công"); 
    } catch (error) {
        alert("Lỗi, không thể thêm sản phẩm vào giỏ hàng");
        console.error("error", error);
    }
} 

  const handleItemPress = (product) => {
    navigation.navigate('Productinfo', { product }); 
  };
  return (
    <Pressable
      style={{ marginHorizontal: 10, marginVertical: 25, width: "44%" }}
      onPress={() => {handleItemPress(item)}}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#f95122",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: "10",
          marginTop: 10,
        }}
        onPress={()=>handleAddCart(item)}
      >
        <Text style={{color:'white'}}>Thêm vào giỏ hàng</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
