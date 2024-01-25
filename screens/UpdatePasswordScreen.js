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
  // import jwtDecode from 'jwt-decode';
  import { UserType } from "../UserContext";
  import axios from "axios";
  import { API_BASE_URL } from "../Locahost";

  const UpdatePasswordScreen = ({navigation}) => {
    const [password, setpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    
    const {userId, setUserId} = useContext(UserType)
    console.log("user:",userId)
    const handleAddAddress = () => {
        if(newpassword!==confirmpassword) {
            alert("Xác nhận mật khẩu mới sai")
        }else{
            const Infopassword = {
                password: password,
                newpassword: newpassword,
            }
            
            axios.put(`${API_BASE_URL}/user/updatePassword/${userId}`, Infopassword).then((response) => {
                console.log(response);
            alert(
            "Cập nhật thành công"
            );
            }).catch((error) => {
              alert("Cập nhật lỗi")
              console.log(error)
            })
        }
        
    }
    
    return (
      <ScrollView
        style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor:"white",
    }}>
        <View style={{ height: 50, backgroundColor: "#f95122" }}>
        <View style={{ height: 50, backgroundColor: "#f95122" }}>
          <Text style={{fontSize:20, color:'white', alignSelf:'center',justifyContent:"center", fontWeight:'bold', marginTop:10}}>Cập nhật mật khẩu</Text>
        </View>
        </View>
  
        <View style={{ padding: 10 }}>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Nhập mật khẩu
            </Text>
  
            <TextInput
              value={password}
              onChangeText={(text) => setpassword(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Nhập mật khẩu mới
            </Text>
  
            <TextInput
              value={newpassword}
              onChangeText={(text) => setNewpassword(text)}
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
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Xác nhận lại mật khẩu
            </Text>
  
            <TextInput
              value={confirmpassword}
              onChangeText={(text) => setConfirmpassword(text)}
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
            <Text style={{ fontWeight: "bold", color:'white' }}>Cập nhật</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
}
  
  export default UpdatePasswordScreen;
  
  const styles = StyleSheet.create({});