import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CartScreen from "../screens/CartScreen";
import ProductItem from "../components/ProductItem";
import ProductInforScreen from "../screens/ProductInforScreen";
import AddressScreen from "../screens/AddressScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";
import UpdateAddress from "../screens/UpdateAddressScreen";
import {Entypo, AntDesign, Octicons , MaterialCommunityIcons, Ionicons, FontAwesome5  } from '@expo/vector-icons';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return(
      <Tab.Navigator>
        <Tab.Screen
          name = "Home"
          component={HomeScreen}
          options={{
            tabBarLabel:"Home",
            tabBarLabelStyle: {
              color:"#F1582C",
            },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Entypo name="home" size={24} color="#F1582C"/>
            ) : (
              <AntDesign name="home" size={24} color="black"/>
            )
          }}
        />
        <Tab.Screen
          name = "Cart"
          component={CartScreen}
          options={{
            tabBarLabel:"Giỏ hàng",
            tabBarLabelStyle: {
              color:"#F1582C",
            },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused ? (
              <Ionicons name="ios-cart" size={24} color="#F1582C" />
            ) : (
              <Ionicons name="ios-cart-outline" size={24} color="black" />  
            )
          }}
        />
        <Tab.Screen
          name = "toi"
          component={ProfileScreen}
          options={{
            tabBarLabel:"Tôi",
            tabBarLabelStyle: {
              color:"#F1582C",
            },
            headerShown:false,
            tabBarIcon:({focused}) => 
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color="#F1582C"/>
            ) : (
              <FontAwesome5 name="user" size={24} color="black"/>
            )
          }}
        />  
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="ProductItem" component={ProductItem} />
        <Stack.Screen name="Productinfo" component={ProductInforScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Address" component={AddressScreen} options={{headerShown:false}}/>
        <Stack.Screen name="UpdateAddress" component={UpdateAddress} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
    
});
