import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, Image, Touchable, TouchableOpacity } from "react-native";
import AWS from 'aws-sdk';


export default function   SavePost({ post, handlePostCanceled, userData }) {
    const [description, setDescription] = useState()
    const [buff, setBuff] = useState()

    const createPost = async () => {

        const uri  = post.assets[0].uri

        const s3 = new AWS.S3({
            accessKeyId: 'AKIAVHMZYIHXA54VHQWX',
            secretAccessKey: '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',
            region: 'Asia Pacific (Mumbai) ap-south-1',
            debug: true
        });



        const params = {
            Bucket: 'post-video-storage',
            Key: `123456789kcsxsuhil`,
            Body: uri,
            ContentType: 'video/mp4',
        };

        const postData = {
            video: post,
            description: description,
            userData: userData
        }
        await axios.post('http://192.168.1.3:3000/api/auth/createPost', postData).then((responce) => {
            if (responce.data.status === 'success') {
                s3.putObject(params, function (err, data) {
                    if (err) {
                        console.log("error happend ", err);
                    } else {
                        console.log(`Successfully uploaded video to ${params.Bucket}/${params.Key}`);
                    }
                });
            }
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Image
                    style={styles.mediaPreview}
                    source={{ uri: post.uri }}
                />

                <TextInput
                    style={styles.inputText}
                    maxLength={150}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe your videos" />

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handlePostCanceled()}
                    style={styles.cancelButton}
                >
                    <Feather name="x" size={24} color="black" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => createPost()}
                    style={styles.saveButton}
                >
                    <Feather name="check" size={24} color="black" />
                    <Text style={styles.saveButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: 320,
        height: 120,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    mediaPreview: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '45%',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5c5c',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '45%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 18,
        marginLeft: 10,
    },
});

