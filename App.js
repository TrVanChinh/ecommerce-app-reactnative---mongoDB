// in folder api: 
// - npm init
// - npm install --save body-parser express mongoose jsonwebtoken nodemailer nodemon cors 

// use navigation:
// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack
// npm install @react-navigation/bottom-tabs


// use react native element:
// npm install react-native-elements
// npm install react-native-vector-icons


//npm i axios

//create slide:
//npm install react-native-swiper


//handle login:
//npx expo install @react-native-async-storage/async-storage

//npm i react-native-dropdown-picker


//npm install @reduxjs/toolkit
//npm install react-redux
//npm i jwt-decode


//React Native, Modal là một thành phần (component) giúp hiển thị một cửa sổ (overlay) lớn chồng lên trên ứng dụng chính
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { UserContext } from './UserContext';
export default function App() {
  return (
    <> 
      <UserContext>
        <StackNavigator/>
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
