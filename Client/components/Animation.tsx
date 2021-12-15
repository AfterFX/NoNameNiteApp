import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import React, {Component, useCallback, useRef} from "react";

const StatusBarHeight = Constants.statusBarHeight;

export class Avoid extends Component<{}, { [key: string]: string }>{
    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            skill: props.skill,
        }

        if(this.state.skill === "meteor"){
            this.meteor()
        }
    }

    meteor() {
        AnimValues.meteor.opacity.setValue(1)
        const meteorDistance = 1000;
        //set meteor start position
        AnimValues.meteor.PositionX.setValue(320+meteorDistance);
        AnimValues.meteor.PositionY.setValue(210+meteorDistance);
        //meteor moving
        Animated.timing(AnimValues.meteor.XY, {
            useNativeDriver: false,
            toValue: {x: (-170+(-meteorDistance)), y: (-270+(-meteorDistance))},
            duration: 750,
            // easing: Easing.back(5),
            // easing: Easing.bounce
            // easing: Easing.elastic(3)
            // easing: Easing.bezier(.06,1,.86,.23)
        }).start(() => {
            //meteor explode size
            Animated.timing(AnimValues.meteor.scale, {
                toValue: 10,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                //hide meteor after explode
                Animated.timing(AnimValues.meteor.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }).start(() => {
                    //reset meteor location and size
                    AnimValues.meteor.XY.setValue({x: 0, y: 0});
                    AnimValues.meteor.scale.setValue(1);
                });
            });
        })
    }
}

export const shake = (state: any) => {
    // makes the sequence loop
    Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
            // Reset Attacker position
            Animated.timing(state.player, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            // shift Attacker to the ahead
            Animated.timing(state.player, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true
            }),
        ]),
        // loops the above animation config 1 times
        { iterations: 1 }
    ).start(() => {
        // shift Attacker to the back
        Animated.timing(state.player, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start()
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // Reset Defender position
                Animated.timing(state.enemy, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),
                // shift Defender to the push back
                Animated.timing(state.enemy, {
                    toValue: -20,
                    duration: 150,
                    useNativeDriver: true
                }),
                // Reset Defender position
                Animated.timing(state.enemy, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true
                }),
            ]),
            // loops the above animation config 1 times
            { iterations: 1 }
        ).start();
    });
};



const styles = StyleSheet.create({
    meteor: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#ff592c',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//Default animation values
export const AnimValues = {
    player: new Animated.Value(0),
    enemy: new Animated.Value(0),
    meteor: {
        XY: new Animated.ValueXY({x: 0, y: 0}),
        scale: new Animated.Value(1),
        opacity: new Animated.Value(0),
        PositionX: new Animated.Value(0),
        PositionY: new Animated.Value(0),
    },
}

export const AnimationStates: any = {
    skills:{
        meteor: [{opacity: AnimValues.meteor.opacity, transform: [ { scale: AnimValues.meteor.scale } ], marginTop: AnimValues.meteor.PositionX, marginLeft: AnimValues.meteor.PositionY}, AnimValues.meteor.XY.getLayout(), styles.meteor],
    }
}