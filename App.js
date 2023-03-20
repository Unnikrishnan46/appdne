import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SavePost from './components/camera/SavePost';
import CreateVideo from './pages/CreateVideo';
import Feeds from './pages/Feeds';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import TikTokBottomBar from './pages/TikTokBottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [userData,setUserData] = useState()

 async function findUser() {
    const token =await AsyncStorage.getItem('token')
    const user = await AsyncStorage.getItem('userData')
    if (token && user) {
      setLoggedIn(true);
      setUserData(user);
    }
  }
  findUser();

  // useEffect (async()=>{
  //   const token =await AsyncStorage.getItem('token')
  //   const user = await AsyncStorage.getItem('userData')
  //   if (token) {
  //     setLoggedIn(true);
  //   }
  // },[]);

  function handleLogout (){
    console.log("logout working")
    setLoggedIn(false);
  }


  function handleSignUp() {
    setSignUp(true)
    setLogin(false)
  }

  function handleLogin() {
    setSignUp(false);
    setLogin(true)
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleSelectedTab(tab) {
    setSelectedTab(tab);
  }


  return (
    <View style={styles.container}>
      {signUp && !loggedIn ? <SignupScreen handleLogin={handleLogin} /> : ""}
      {login && !loggedIn ? <LoginScreen handleSignUp={handleSignUp} handleLoggedIn={handleLoggedIn} /> : ""}
      {loggedIn && selectedTab === 'add' ? <CreateVideo userData={userData}/> : ""}
      {selectedTab === 'home' && loggedIn ? <Feeds /> : ""}
      {selectedTab === 'profile' && loggedIn ? <ProfilePage handleLogout={handleLogout}/> : ""}
      {loggedIn ? <TikTokBottomBar handleSelectedTab={handleSelectedTab} /> : ""}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
});
