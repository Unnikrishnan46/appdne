import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileNavbar from '../components/profile/ProfileNavbar';

function ProfilePage({handleLogout}) {
  return (
    <View style={styles.container}>
        <ProfileNavbar />
        <ProfileHeader handleLogout={handleLogout}/>
    </View>
  )
}

export default ProfilePage


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:24,
        backgroundColor:"white"
    }
})