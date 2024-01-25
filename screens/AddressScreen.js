import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useState,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  // import jwtDecode from 'jwt-decode';
  import { UserType } from "../UserContext";
  import axios from "axios";
  import { API_BASE_URL } from "../Locahost";

  const AddressScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [country, setCoutry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId, setUserId} = useContext(UserType)
    // useEffect(() => {
    //   const fetchUser = async() => {
    //       const token = await AsyncStorage.getItem("authToken")
    //       //fix 0, _jwtDecode.default is not a function (it is undefined)
    //       jwtDecode = require('jwt-decode');
    //       const decodedToken = jwtDecode(token);
    //       const userId = decodedToken.userId;
    //       setUserId(userId)
    //   }
  
    //   fetchUser();
    // },[]);
    console.log(userId)
    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            state,
            city,
            country,
            postalCode,
        }
  
        axios.post(`${API_BASE_URL}/addresses/`,{userId,address}).then((response) => {
            Alert.alert("Success","Addresses added successfully");
            setName("");
            setMobileNo("");
            setHouseNo("");
            setStreet("");
            setState("");
            setCity("");
            setCoutry("");
            setPostalCode("");
  
            setTimeout(() => {
              navigation.goBack();
            },500)
        }).catch((error) => {
            Alert.alert("Error","Failed to add address")
            console.log("error",error)
        })
    } 
    return (
      <ScrollView style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor:"white"}}
        >
        <View style={{ height: 50, backgroundColor: "#f95122" }}>
        <View style={{ height: 50, backgroundColor: "#f95122" }}>
          <Text style={{fontSize:20, alignSelf:'center',justifyContent:"center", fontWeight:'bold', marginTop:10, color:'white'}}>Thêm địa chỉ</Text>
        </View>
        </View>
        
        <View style={{ padding: 10 }}>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Họ tên
            </Text>
  
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Nhập tên"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Số điện thoại
            </Text>
  
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="..."
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Số nhà
            </Text>
  
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Đường/phố
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Quận/huyện
            </Text>
            <TextInput
              value={state}
              onChangeText={(text) => setState(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Thành phố</Text>
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Quốc gia
            </Text>
            <TextInput
              value={country}
              onChangeText={(text) => setCoutry(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mã bưu điện</Text>
  
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder=""
            />
          </View>
  
          <Pressable
            onPress={handleAddAddress}
            style={{
              backgroundColor: "#F1582C",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              alignSelf:'center',
              marginTop: 20,
              width:"40%"
            }}
          >
            <Text style={{ fontWeight: "bold", color:'white' }}>Tạo</Text>
          </Pressable>
          <View style={{ paddingBottom:40}}/>

        </View>
      </ScrollView>
    );
  };
  
  export default AddressScreen;
  
  const styles = StyleSheet.create({});