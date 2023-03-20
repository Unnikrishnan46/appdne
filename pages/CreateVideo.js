import React,{useState} from 'react';
import { View, Text } from 'react-native';
import Camera from '../components/camera/CameraComponent';
import { NavigationContainer } from '@react-navigation/native';
import SavePost from '../components/camera/SavePost';

function CreateVideo({userData}) {
    const [SavePostPage,setSavePostPage] = useState(false);
    const [post,setPost] = useState();
    const [postCanceled,setPostCanceled] = useState(false)

    function handleSavePost (data){
        console.log("save post working")
        setPost(data)
        setSavePostPage(true);
      }

      function handlePostCanceled (){
        setPostCanceled(true);
        setSavePostPage(false)
      }
    return (
        <NavigationContainer>
                {!SavePostPage ? <Camera handleSavePost={handleSavePost}/> : "" } 
                {SavePostPage && !postCanceled ? <SavePost post={post} handlePostCanceled={handlePostCanceled} userData={userData}/> : ""}
        </NavigationContainer>
    )
}

export default CreateVideo
