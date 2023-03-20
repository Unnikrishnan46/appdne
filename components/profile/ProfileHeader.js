import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Avatar} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
function ProfileHeader({handleLogout}) {
    const logOut =async ()=>{
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userData').then((res)=>{
                handleLogout()
            })

          } catch (error) {
            console.log(error);
          }
    }
  return (
    <View style={styles.container}>
        <Avatar.Icon size={80} icon={"account"}/>
        <Text style={styles.emailText}>erayamcode2004@gmail.com</Text>

        <View style={styles.counterContainer}>
            <View style={styles.counterItemContainer}>
                <Text style={styles.counterNumberText}>0</Text>
                <Text style={styles.counterLabelText}>Following</Text>
            </View>

            <View style={styles.counterItemContainer}>
                <Text style={styles.counterNumberText}>0</Text>
                <Text style={styles.counterLabelText}>Followers</Text>
            </View>

            <View style={styles.counterItemContainer}>
                <Text style={styles.counterNumberText}>0</Text>
                <Text style={styles.counterLabelText}>Like</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.grayOutlinedButton}>
            <Text>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.grayOutlinedButton} onPress={()=>logOut()}>
            <Text>Log Out</Text>
        </TouchableOpacity>

    </View>
  )
}

export default ProfileHeader



const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        alignItems:'center',
        paddingHorizontal:65,
        borderBottomWidth:1,
        borderColor:'lightgray',
    },
    emailText:{
        padding:20,
    },
    counterContainer:{
        paddingBottom:20,
        flexDirection:'row'
    },
    counterItemContainer:{
        flex:1,
        alignItems:'center'
    },
    counterNumberText:{
        fontWeight:'bold',
        fontSize:16,
    },
    counterLabelText:{
        color:'gray',
        fontSize:11,
    },
    grayOutlinedButton:{
        borderColor:'lightgray',
        borderWidth:1,
        borderRadius:4,
        paddingVertical:10,
        paddingHorizontal:30
    }
    

})