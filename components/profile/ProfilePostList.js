import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfilePostListItems from './ProfilePostListItems';

function ProfilePostList({posts}) {
  return (
    <View>
        <FlatList
            numColumns={3}
            removeClippedSubviews
            data={posts}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(<ProfilePostListItems item={item}/>)}
        />
    </View>
  )
}

export default ProfilePostList





const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
