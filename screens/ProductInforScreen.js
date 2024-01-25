import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState,useContext } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwtDecode from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";
import { API_BASE_URL } from "../Locahost";

const ProductInforScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const { height, width } = Dimensions.get("window");
  const [selectIndex, setSelectIndex] = useState(0);
  const [listImage, setListImage] = useState([]);
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
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: height / 2 }}>
          {/* <FlatList
              pagingEnabled
              horizontal
              onScroll={(e) => {
                setSelectIndex(
                  (e.nativeEvent.contentOffset.x / width).toFixed(0)
                );
              }}
              data={listImage}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Image
                    style={{ 
                      width: width,
                      height: height / 2, 
                    }}
                    source={{ uri: item.data.url}}
                  />
                );
              }}
            /> */}
          <Image
            style={{
              width: "80%",
              height: height / 2,
              alignSelf: "center",
            }}
            source={{ uri: product?.image }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
          }}
        > 
          <Pressable onPress={()=>  navigation.goBack()}>
              <Ionicons
              name="chevron-back-circle"
              size={30}
              color="#858585"
            />
          </Pressable>
          
          <View style={{ flex: 1 }} />
          <Ionicons name="cart" size={30} color="#858585" right={0} />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20 }}>{product?.title}</Text>
          <Text style={{ color: "red", fontSize: 20 }}>{product?.price}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            padding: 10,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Ionicons name="ios-star" size={24} color="yellow" />
            <Text>4.9</Text>
          </View>
          <Text style={{ flex: 1 }}>Đã bán 1.2k</Text>
          <View style={{ flex: 1, flexDirection: "row", paddingStart: 40 }}>
            <TouchableOpacity
              style={{ alignItems: "center", paddingRight: 20 }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <AntDesign name="sharealt" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, padding: 5 }}>Mô tả sản phẩm</Text>
          <Text>{product?.description}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent:'center'}}>
          <Pressable
            // onPress={() => addItemToCart(route?.params?.item)}
            onPress={() => handleAddCart(product)}
            style={{
              backgroundColor: "#f95122",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
              width: "40%",
            }}
          >
            <Text style={{ color: "white" }}>Thêm vào giỏ hàng</Text>
            {/* {addedToCart ? (
              <View>
                <Text>Added to Cart</Text>
              </View>
            ) : (
              <Text>Add to Cart</Text>
            )} */}
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#FFAC1C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
              width: "40%",
            }}
          >
            <Text style={{ color: "white" }}>Mua ngay</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInforScreen;

const styles = StyleSheet.create({});

