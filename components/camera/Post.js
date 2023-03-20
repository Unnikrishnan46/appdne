import { Video } from 'expo-av';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, useWindowDimensions, Dimensions } from 'react-native';

const Post = forwardRef(({ videoUri }, ParentRef) => {
    const ref = useRef(null)
    useImperativeHandle(ParentRef, () => ({
        play,
        unload,
        stop,
        pause
    }))

    useEffect(() => {
        return () => unload();
    }, [])


    const pause = async () => {
        if (ref.current == null) {
            return;
        }
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.pauseAsync();
        } catch (error) {
            console.log(error);
        }
    }


    const play = async () => {
        if (ref.current == null) {
            return;
        }
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (error) {
            console.log(error);
        }
    }

    const stop = async () => {
        if (ref.current == null) {
            return;
        }
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.stopAsync();
        } catch (error) {
            console.log(error);
        }
    }

    const unload = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            await ref.current.unloadAsync();
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <Video
            ref={ref}
            style={styles.container}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            source={{ uri: videoUri }}
        />

    )
})

export default Post

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});