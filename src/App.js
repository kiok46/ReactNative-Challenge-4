import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { BlurView } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import Images from './images';

AnimatedBlurView = Animated.createAnimatedComponent(BlurView);


class PhotoInfo extends Component {

    state={
        activeImage: null,
        animation: new Animated.Value(0)
    }

    handleImageOpen = (idx) => {        
        this.setState({activeImage: Images[idx]})
        Animated.spring(this.state.animation, {
            toValue: 1,
            duration: 200
        }).start()
    }

    handleClose = () => {
        this.setState({activeImage: null})
        Animated.spring(this.state.animation, {
            toValue: 0,
            duration: 100
        }).start()
    }

    render() {

        const interpolatePopHeight = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["20%", "70%"]
        })

        const interpolatePopWidth = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["20%", "90%"]
        })

        const popImageOpacityinterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        popImageStyle = {
            height: interpolatePopHeight,
            width: interpolatePopWidth
        }

        const popImageOpacityStyle = {
            opacity: popImageOpacityinterpolate,
        }

        return (
            <View style={styles.container}>
                <ScrollView style={styles.feedStyle}>
                    <View style={styles.grid}>
                    {
                        Images.map((src, idx) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={idx}
                                    onLongPress={() => this.handleImageOpen(idx)}
                                >
                                    <Image
                                        source={src}
                                        resizeMode="cover"
                                        style={styles.photoStyle}
                                    />
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                    </View>
                </ScrollView>
                <TouchableWithoutFeedback onPress={this.handleClose}>
                <AnimatedBlurView 
                    tint="default"
                    intensity={100}
                    pointerEvents={this.state.activeImage ? "auto" : "none"}
                    style={[StyleSheet.absoluteFill, styles.popStyle, popImageOpacityStyle]}
                >
                    <TouchableWithoutFeedback
                        pointerEvents={"none"}
                    >                    
                        <Animated.View style={[styles.popImageStyle, popImageStyle]}> 
                                <View style={styles.photoDetailBar}>
                                    <Image
                                        source={Images[3]}
                                        style={styles.userIconImage}
                                    />
                                    <Text>Kuldeep Singh Grewal</Text>
                                </View>
                                <Image
                                    style={styles.photo}
                                    resizeMode="stretch"
                                    source={this.state.activeImage}
                                />
                                <View style={styles.photoInteractions}>
                                    <EvilIcons name="heart" size={32} color="grey"/>
                                    <EvilIcons name="comment" size={32} color="grey"/>
                                    <EvilIcons name="share-apple" size={32} color="grey"/>
                                </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </AnimatedBlurView>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    photoStyle: {
        width: "33%",
        height: 150
    },
    popStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    popImageStyle: {
        backgroundColor: 'white',
        height: null,
        width: null,
    },
    userIconImage: {
        height: 25,
        width: 25,
        borderRadius: 15,
        marginRight: 10
    },
    photoDetailBar: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    },
    photo: {
        flex: 6,
        width: null,
        height: null,
    },
    photoInteractions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
})

export default PhotoInfo;