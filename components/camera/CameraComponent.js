import React, { useEffect ,useState} from 'react'
import {StyleSheet, View , Text ,TouchableOpacity ,Image} from 'react-native'
import {Camera, CameraType} from 'expo-camera'
import {Audio} from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import {Feather} from "@expo/vector-icons"


function CameraComponent({handleSavePost}) {
  const [hasCameraPermissions,setHasCameraPermissions] = useState(false)
  const [hasAudioPermissions,setHasAudioPermissions] = useState(false)
  const [hasGalleryPermissions,setHasGalleryPermissions] = useState(false)

  const [galleryItems,setGalleryItems] = useState([])

  const [cameraRef,setCameraRef] = useState(null)
  const [cameraType,setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash,setCameraFlash] = useState(Camera.Constants.FlashMode.off)

  const [isCameraReady,setIsCameraReady] = useState(false)
  const isFocused = useIsFocused()

    useEffect(()=>{
      (async ()=>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync()
        setHasCameraPermissions(cameraStatus.status == 'granted')

        const audioStatus = await Audio.requestPermissionsAsync()
        setHasAudioPermissions(audioStatus.status == 'granted')

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setHasGalleryPermissions(galleryStatus.status == 'granted')

        if(galleryStatus.status == 'granted'){
          const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy:['creationTime'],mediaType:['video']})
          setGalleryItems(userGalleryMedia.assets)
        }

      })()
    },[])


    const recordVideo = async ()=>{
      if(cameraRef){
        try {
          const options = {maxDuration:60 , quality:Camera.Constants.VideoQuality['480']}
          const videoRecordPromise = cameraRef.recordAsync(options)
          if(videoRecordPromise){
            const data = await videoRecordPromise;
            const source = data.uri
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    const stopVideo = async ()=>{
      if(cameraRef){
        cameraRef.stopRecording()
      }
    }

    const pickFromGallery =async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Videos,
        allowsEditing:true,
        quality:1
      }).catch(error=>{
        console.log(error)
      })
      if(!result.canceled){
        handleSavePost(result);
      }
    }

    if(!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions){
      return (
        <View></View>
      )
    }

  return (
    <View style={styles.container}>
        {isFocused ? <Camera 
        ref={ref => setCameraRef(ref)} 
        style={styles.camera} 
        ratio={'16:9'}
        type={cameraType}
        flashMode={cameraFlash}
        onCameraReady={()=> setIsCameraReady(true)}
        />
        : null}


        <View style={styles.sideBarContainer}>
          <TouchableOpacity 
          style={styles.sidebarButton} 
          onPress={()=> setCameraType(cameraType=== Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
            <Feather name='refresh-ccw' size={24} color={'white'}/>
            <Text style={styles.iconText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
           style={styles.sidebarButton}
           onPress={()=> setCameraFlash(cameraFlash=== Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}>
            <Feather name='zap' size={24} color={'white'}/>
            <Text style={styles.iconText}>Flash</Text>
          </TouchableOpacity>
        </View>



          <View style={styles.bottomBarContainer}>

            <View style={{flex:1}}></View>

              <View style={styles.recordButtonContainer}>
                <TouchableOpacity disabled={!isCameraReady}
                onLongPress={()=>recordVideo()}
                onPressOut={()=>stopVideo()}
                style={styles.recordButton}
                />
              </View>

              <View style={{flex:1}}>
                <TouchableOpacity 
                onPress={()=> pickFromGallery()}
                style={styles.galleryButton}>

                  {galleryItems[0] == undefined ? <></> : 
                  <Image
                  style={styles.galleryButtonImage}
                  source={{uri:galleryItems[0].uri}}
                  />}

                </TouchableOpacity>

              </View>
          </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:30
  },
  camera:{
    flex:1,
    backgroundColor : 'black',
    aspectRatio:9 / 16,
  },
  bottomBarContainer:{
    alignItems:'center',
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    marginBottom: 30,
  },
  recordButtonContainer:{
    flex:1,
    marginHorizontal:30,
  },
  recordButton:{
    borderWidth: 8,
    borderColor: '#ff404087',
    backgroundColor : '#ff4040',
    borderRadius:100,
    height : 80,
    width:80,
    alignSelf:'center',
  },
  galleryButton:{
    borderWidth:2,
    borderColor:'white',
    borderRadius:10,
    overflow:'hidden',
    width:50,
    height:50,
  },
  galleryButtonImage:{
    width:50,
    height:50,
  },
  sideBarContainer:{
    top:60,
    right:0,
    marginHorizontal:20,
    position:'absolute',
  },
  iconText:{
    color:'white',
    fontSize:12,
    marginTop:5,
  },
  sidebarButton:{
    alignItems:'center',
    marginBottom:25,
  }
});

export default CameraComponent
