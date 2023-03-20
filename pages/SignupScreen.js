import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const SignupScreen = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');


  const toastOptions = {
    type: 'error',
    text1: 'Error',
    text2: 'Password must be the same',
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

  console.log(email)
  console.log(password)
  console.log(confirmPassword)
  const handleSignup = async () => {
    const data = {
      email: email,
      username:username,
      password: password,
      confirmPassword: confirmPassword
    };

    if (email === '') {
      console.log("condition applied")
      Toast.show(toastOptions);
      return null
    }
    if (password === '') {
      Toast.show(toastOptions);
      return null
    }
    if (confirmPassword === '') {
      Toast.show(toastOptions);
      return null
    }

    if (password != confirmPassword) {
      Toast.show(toastOptions);
      return null
    }
    else {
      await axios.post('http://192.168.1.3:3000/api/auth/signup', data)
        .then((response) => {
          console.log('Signup successful! ', response.data.status);
          if (response.data.status === "fail") {
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
          } if (response.data.status === "success") {
            Toast.show({
              type: 'success',
              text1: 'Success',
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
        })
        .catch((error) => {
          console.log(error);
          console.log('Signup failed.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        // secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
      <View style={styles.loginText}>
        <Text style={styles.loginText}>
          Already have an account?
          <Text
            style={styles.loginLink}
            onPress={handleLogin}
          >
            Login
          </Text>
        </Text>
      </View>
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
  loginText: {
    marginVertical: 20,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default SignupScreen;
