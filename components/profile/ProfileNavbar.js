import { Feather } from '@expo/vector-icons';
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ProfileNavbar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name='search' size={20} />
      </TouchableOpacity>

      <Text style={styles.text}>user_name</Text>
      
      <TouchableOpacity>
        <Feather name='menu' size={24} />
      </TouchableOpacity>

    </View>
  )
}

export default ProfileNavbar



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  text: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})