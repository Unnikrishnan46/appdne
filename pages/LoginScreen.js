import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, TextInput, Button, Text ,TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({handleSignUp , handleLoggedIn}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toastOptions = {
    type: 'error',
    text1: 'Error',
    text2: 'Please fill in all fields.',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 20,
    bottomOffset: 70,
    position: 'bottom',
    shadow: true,
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
    backgroundColor: '#d9534f',
    color: '#fff',
  }
  
  const handleLogin = async() => {
    const data = {
      email: email,
      password: password,
    };

    if (email === "") {
      Toast.show(toastOptions);
      return null;
    }
    if(password === ""){
      Toast.show(toastOptions);
      return null;
    }
    else{
      console.log("kerunund")
      await axios.post('http://192.168.1.3:3000/api/auth/login', data)
        .then((response) => {
          console.log(response.data.status);
          if(response.data.status === "fail"){
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: response.data.message,
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 20,
              bottomOffset: 70,
              position: 'bottom',
              shadow: true,
              animationIn: 'fadeIn',
              animationOut: 'fadeOut',
              backgroundColor: '#d9534f',
              color: '#fff',
            });
            return null
          }
          if(response.data.status === "success"){
            AsyncStorage.setItem('token',response.data.token );
            AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
            handleLoggedIn()
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('Signup failed.');
        });
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login to your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.createAccount}>Create an Account</Text>
      </TouchableOpacity>
      <Toast />
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  createAccount: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
