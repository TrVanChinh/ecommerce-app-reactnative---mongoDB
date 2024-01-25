import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  SimpleLineIcons,
  Entypo,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwtDecode from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";
import { API_BASE_URL } from "../Locahost";

const ProfileScreen = ({ navigation }) => {
  const [isLogin, setLogin] = useState(null);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState([]);
  const {userId, setUserId} = useContext(UserType)
  const [count, setCount] = useState(0);
   
  const fetchUser = async() => {
    const token = await AsyncStorage.getItem("authToken")
    //fix 0, _jwtDecode.default is not a function (it is undefined)
    jwtDecode = require('jwt-decode');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setUserId(userId)
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${userId}`
      );
      const { user } = response.data;
      setUser(user);
      setName(user.name);
      setEmail(user.email);
      setMobileNo(user.mobileNo);
      setAddresses(user.addresses);
    } catch (error) {
      console.log("error", error);
    }
  }
    useEffect(() => {
      fetchUser();
    },[count]);
    
    console.log(userId)
    useFocusEffect(
      useCallback(() => {
        fetchUser();
      }, [])
    );

    const handleUpdateInfo = () => {
      const user = {
        name: name,
        email: email,
        mobileNo: mobileNo,
      }
      axios.put(`${API_BASE_URL}/user/${userId}`, user).then((response) => {
        console.log(response);
        alert(
        "Cập nhật thành công"
        );
      }).catch((error) => {
          Alert.alert("Update error")
          console.log(error)
        })
    }

    const handleDelete = (idAddress) => {
      axios.delete(`${API_BASE_URL}/addresses/${userId}/${idAddress}`).then((response) => {
        console.log(response);
        alert(
        "Xóa thành công"
        );
        setCount((prevCount) => prevCount + 1);
      }).catch((error) => {
          alert("Xóa không thành công")
          console.log(error)
        })
    }


  const handleItemPress = () => {
    navigation.navigate("Address");
  };

  const handlePassword = () => {
    navigation.navigate("UpdatePassword");
  };

  const handleUpdateAddress = (addresse) => {
    navigation.navigate("UpdateAddress", addresse);
  };
  // const handleUpdate = () => {
  //   // Xử lý khi nút cập nhật được nhấn
  //   // Có thể thêm logic lưu trữ thông tin vào database, Redux store, hoặc nơi khác tùy thuộc vào ứng dụng của bạn
  //   // Sau khi cập nhật, bạn có thể tắt chế độ chỉnh sửa
  //   setIsEditMode(false);
  // };

  const handleEdit = () => {

    setIsEditMode(true);
  };

  const handleCancel = () => {
    // Hủy chế độ chỉnh sửa khi nút "Hủy" được nhấn
    setIsEditMode(false);
  };

  const handleLogout = async () => {
    try {
      // Xóa token hoặc các thông tin đăng nhập khác
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSave = () => {
    // Xử lý khi nút "Lưu" được nhấn
    // Có thể thêm logic lưu trữ thông tin vào database, Redux store, hoặc nơi khác tùy thuộc vào ứng dụng của bạn
    // Sau khi lưu, bạn có thể tắt chế độ chỉnh sửa
    setIsEditMode(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.upperView}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                padding: 15,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "white",
                }}
              >
                <Image
                  style={styles.avt_image}
                  source={{
                    uri: "https://i.pinimg.com/564x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg",
                  }}
                />
              </View>
              <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
            <>
              {/* Area nut dang nhap, dang ki */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingRight: 10,
                }}
              >
                <TouchableOpacity style={styles.btn_login} onPress={ handleLogout}>
                  <Text style={{ color: "white" }}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Thông tin chung
          </Text>
          <View style={{ padding: 10 }}>           
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15 }}>
                Họ tên
              </Text>

              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={"black"}
                editable={isEditMode}
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
              <Text style={{ fontSize: 15 }}>Số điện thoại</Text>

              <TextInput
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                placeholderTextColor={"black"}
                editable={isEditMode}
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
              <Text style={{ fontSize: 15 }}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={"black"}
                editable={isEditMode}
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

          </View>
          {isEditMode ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  flex: 1,
                }}
                onPress={handleCancel}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 10,
                  flex: 1,
                }}
                onPress={handleUpdateInfo}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#f95122",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                width:"40%",
                alignSelf:'center'
              }}
              onPress={handleEdit}
              // disabled={!isEditMode} // Ngăn chặn khi không ở chế độ chỉnh sửa
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cập nhật
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Đổi mật khẩu
          </Text>
          <Pressable
            onPress={() => handlePassword()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Đổi mật khẩu</Text> 
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Địa chỉ của bạn
          </Text>
          <Pressable
            onPress={() => handleItemPress()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Thêm địa chỉ mới</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
          <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              key={item._id} 
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.state}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.city}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Số điện thoại:{item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Mã bưu điện: {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#f95122",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                  onPress={() => handleUpdateAddress(item)}
                  // onPress={() => console.log(item)}
                >
                  <Text style={{color:'white'}}>Cập nhật</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={{color:'white'}}>Xóa</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  upperView: {
    flex: 2,
    backgroundColor: "#f95122",
  },
  lowerView: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  avt_image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 8,
  },
  btn_login: {
    width: 100,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  list_items: {
    marginVertical: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});
