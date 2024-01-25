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

  const UpdateAddressScreen = ({navigation, route}) => {
    const  address  = route.params;
    const [name, setName] = useState(address.name);
    const [mobileNo, setMobileNo] = useState(address.mobileNo);
    const [houseNo, setHouseNo] = useState(address.houseNo);
    const [street, setStreet] = useState(address.street);
    const [state, setState] = useState(address.state);
    const [city, setCity] = useState(address.city);
    const [country, setCoutry] = useState(address.country);
    const [postalCode, setPostalCode] = useState(address.postalCode);
    const {userId, setUserId} = useContext(UserType)
    // console.log(route.params);
    // console.log(address._id)
    const handleUpdateAddress = (idAddress) => {
      console.log(userId)
        const address = {
            name : name,
            mobileNo: mobileNo,
            houseNo : houseNo,
            street:street,
            state : state,
            city : city,
            country : country,
            postalCode : postalCode,
        }
  
        axios.put(`${API_BASE_URL}/addresses/update/${userId}/${idAddress}`, address).then((response) => {
            console.log(response);
            alert(
            "Cập nhật địa chỉ thành công"
            );
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
          <Text style={{fontSize:20, color:'white', alignSelf:'center',justifyContent:"center", fontWeight:'bold', marginTop:10}}>Cập nhật địa chỉ</Text>
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
            onPress={() => handleUpdateAddress(address._id)}
            style={{
              backgroundColor: "#F1582C",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              alignSelf:'center',
              marginTop: 20,
              width:"40%",
            }}
          >
            <Text style={{ fontWeight: "bold", color:'white' }}>Cập nhật</Text>
          </Pressable>
          <View style={{ paddingBottom:40}}/>
        </View>
      </ScrollView>
    );
  };
  
  export default UpdateAddressScreen;
  
  const styles = StyleSheet.create({});