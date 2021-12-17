import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import React, {Component, useCallback, useRef, useState} from "react";

const StatusBarHeight = Constants.statusBarHeight;

export const Avoid = (props: any) => {
        const state = {
            skill: props.skill,
        }
        if(state.skill === "meteor"){
            meteor(props.HpLeft)
        }
}

const meteor = (HpLeft: number) => {
    AnimValues.meteor.opacity.setValue(1)
    const meteorDistance = 1000;
    //set meteor start position
    AnimValues.meteor.PositionX.setValue(320+meteorDistance);
    AnimValues.meteor.PositionY.setValue(210+meteorDistance);

    // shift Attacker to the ahead
    Animated.timing(AnimValues.player.move, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true
    }).start(() => {
        // shift Attacker to the back
        Animated.timing(AnimValues.player.move, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start()
    })
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
            //shake view when meteor explode
            shake();
            //Using Hp effect
            HpEffect(HpLeft);
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

export const attack = () => {
    // makes the sequence loop
    Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
            // Reset Attacker position
            Animated.timing(AnimValues.player.move, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            // shift Attacker to the ahead
            Animated.timing(AnimValues.player.move, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true
            }),
        ]),
        // loops the above animation config 1 times
        { iterations: 1 }
    ).start(() => {
        // shift Attacker to the back
        Animated.timing(AnimValues.player.move, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start()
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // Reset Defender position
                Animated.timing(AnimValues.enemy.move, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),
                // shift Defender to the push back
                Animated.timing(AnimValues.enemy.move, {
                    toValue: -20,
                    duration: 150,
                    useNativeDriver: true
                }),
                // Reset Defender position
                Animated.timing(AnimValues.enemy.move, {
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


export const HealthBar = () => {
    return(
        <View style={styles.healthBarContainer}>
            <View style={styles.healthBarBackground}>
                <Animated.View style={[styles.healthBarProgress, {
                    width: AnimValues.enemy.HP.interpolate({
                        inputRange: [0, 100],
                        outputRange: [`0%`, '100%'],
                    }),
                    backgroundColor: AnimValues.enemy.HP.interpolate({
                        inputRange: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        outputRange: ['rgb(198,21,21)',
                            'rgb(198,46,21)',
                            'rgb(203,64,21)',
                            'rgb(198,103,21)',
                            'rgb(198,144,21)',
                            'rgb(198,171,21)',
                            'rgb(198,198,21)',
                            'rgb(171,198,21)',
                            'rgb(115,198,21)',
                            'rgb(21,198,33)',],
                    }),
                }]}/>
            </View>
        </View>
    )
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
    healthBarContainer: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    healthBarBackground: {
        position: "absolute",
        width: 200,
        height: 10,
        backgroundColor: "#a8a8a8",
        borderRadius: 4,
        overflow: "hidden"
    },
    healthBarProgress: {
        position: "absolute",
        left: 0,
        backgroundColor: "#a28089",
        height: "100%",
        borderRadius: 4
    }
});

//Default animation values
export const AnimValues = {
    player: {move: new Animated.Value(0)},
    enemy: { move: new Animated.Value(0), HP: new Animated.Value(100)},
    shake1: new Animated.Value(0),
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








const shake = () => {
    Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
            // shift element to the left by 2 units
            Animated.timing(AnimValues.shake1, {toValue: 20, duration: 100, useNativeDriver: false}),
            Animated.timing(AnimValues.shake1, {toValue: -20, duration: 100, useNativeDriver: false}),
            Animated.timing(AnimValues.shake1, {toValue: 20, duration: 100, useNativeDriver: false}),
            Animated.timing(AnimValues.shake1, {toValue: 0, duration: 100, useNativeDriver: false})
        ]),
        // loops the above animation config 2 times
        {iterations: 1}
    ).start()
}

const HpEffect = (HpLeft: number) => {
    Animated.timing(AnimValues.enemy.HP, {
        toValue: HpLeft,
        duration: 400,
        easing: Easing.bezier(0.45,0.05,0.55,0.95),
        useNativeDriver: false
    }).start()
}