import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback,
    Easing,
} from "react-native";

export default class animations extends Component {
    state = {
        animation: new Animated.Value(0),
        animation1: new Animated.Value(0),
        ball: new Animated.ValueXY({x: 30, y: 30}),
        opacity: new Animated.Value(1),
    };

    startAnimation = () => {
        Animated.timing(this.state.ball, {
            useNativeDriver: false,
            toValue: {x: 250, y: -350},
            duration: 1500,
            // easing: Easing.back(5),
            // easing: Easing.bounce
            // easing: Easing.elastic(3)
            easing: Easing.bezier(.06,1,.86,.23)
        }).start(() => {
            // this.state.ball.setValue({x: 30, y: 30})
            Animated.timing(this.state.opacity, {
                useNativeDriver: false,
                toValue: 0,
                duration: 500,
            }).start()
        });

    };

    render() {
        const opacity = {
            opacity: this.state.opacity
        };
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.startAnimation}>
                    <Animated.View style={[styles.box, this.state.ball.getLayout(), opacity]} />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 50,
        flex: 1,
        justifyContent: "center",
    },
    box: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});