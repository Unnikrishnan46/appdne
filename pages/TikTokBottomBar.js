import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TikTokBottomBar = ({handleSelectedTab}) => {
  const [selectedTab, setSelectedTab] = useState('home');
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    handleSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('home')}
      >
        <Text 
          style={[
            styles.tabText,
            selectedTab === 'home' ? styles.tabTextSelected : null,
          ]}
        >
          {/* Home */}
          <Icon style={selectedTab==='home' ? styles.home : ""} name="ios-home" size={20} color="white" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('search')}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === 'search' ? styles.tabTextSelected : null,
          ]}
        >
          {/* Search */}
          <Icon style={selectedTab==='search' ? styles.discover : ""} name="search" size={20} color="white" />
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('add')}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === 'add' ? styles.tabTextSelected : null,
          ]}
        >
          {/* Add */}
          <Icon style={selectedTab==='add' ? styles.add : ""} name="add-circle-outline" size={50} color="white" />
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('chat')}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === 'chat' ? styles.tabTextSelected : null,
          ]}
        >
          <Icon style={selectedTab==='chat' ? styles.chat : ""} name="chatbubble" size={20} color="white" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('profile')}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === 'profile' ? styles.tabTextSelected : null,
          ]}
        >
          <Icon style={selectedTab==='profile' ? styles.profile : ""} name="person-circle-outline" size={20} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTextSelected: {
    fontWeight: 'bold',
    color:"red"
  },
  home:{
    fontWeight: 'bold',
    color:"#00BFFF"
  },
  discover:{
    fontWeight: 'bold',
    color:"#00BFFF"
  },
  add:{
    fontWeight: 'bold',
    color:"#00BFFF"
  },
  chat:{
    fontWeight: 'bold',
    color:"#00BFFF"
  },
  profile:{
    fontWeight: 'bold',
    color:"#00BFFF"
  },

});

export default TikTokBottomBar;
