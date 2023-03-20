import React, { useRef } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { Video } from 'expo-av';
import Post from '../components/camera/Post';
function Feeds() {
    const mediaRefs = useRef([])
    const currentPlayingRef = useRef(null);
    const array = [1, 2, 3, 4, 5, 6,7,8,9]



    const cdnVideos = [
        'https://d2g5t8cua6momn.cloudfront.net/vid-1.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-2.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-3.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-4.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-5.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-6.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-7.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-8.mp4',
        'https://d2g5t8cua6momn.cloudfront.net/vid-9.mp4',
        
      ];

    const onViewableItemsChanged = useRef(({ changed }) => {
        console.log("inside onViewAbleItemChanged")
        changed.forEach(element => {
            console.log("inside foreach")
            const cell = mediaRefs.current[element.key]
            if (cell) {
                console.log('onViewableItemsChanged cell', element, element.isViewable)
                if (element.isViewable) {
                    console.log("element.isViewable working")
                    cell.play()
                    if (currentPlayingRef.current && currentPlayingRef.current !== cell) {
                        currentPlayingRef.current.pause()
                    }
                    currentPlayingRef.current = cell
                } else {
                    cell.pause()
                }
            }
        })
    })

    const renderItem = ({ item, index }) => {
        return (
            <View style={[{ flex: 1, height: Dimensions.get('window').height - 10 }, index % 2 == 0 ? { backgroundColor: 'blue' } : { backgroundColor: 'pink' }]}>
                <Post ref={postSingleRef => (mediaRefs.current[item] = postSingleRef)} videoUri={cdnVideos[index % cdnVideos.length]}/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={array}
                windowSize={4}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                    waitForInteraction: true
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item}
                decelerationRate={'normal'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}

export default Feeds


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
