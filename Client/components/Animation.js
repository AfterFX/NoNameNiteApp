import styled from 'styled-components';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import {useCallback} from "react";

const StatusBarHeight = Constants.statusBarHeight;


export const shake = (state) => {
    // makes the sequence loop
    Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
            // Reset Attacker position
            Animated.timing(state.player.current, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            // shift Attacker to the ahead
            Animated.timing(state.player.current, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true
            }),
        ]),
        // loops the above animation config 1 times
        { iterations: 1 }
    ).start(() => {
        // shift Attacker to the back
        Animated.timing(state.player.current, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start()
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // Reset Defender position
                Animated.timing(state.enemy.current, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),
                // shift Defender to the push back
                Animated.timing(state.enemy.current, {
                    toValue: -20,
                    duration: 150,
                    useNativeDriver: true
                }),
                // Reset Defender position
                Animated.timing(state.enemy.current, {
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

export const meteor = (state) => {
    const meteorDistance = 1000;
    Animated.sequence([
        //set meteor start position
        state.AnimationPositionX.setValue(320+meteorDistance),
        state.AnimationPositionY.setValue(210+meteorDistance),
        //meteor moving
        Animated.timing(state.meteorAnim.current, {
            useNativeDriver: false,
            toValue: {x: (-170+(-meteorDistance)), y: (-270+(-meteorDistance))},
            duration: 750,
            // easing: Easing.back(5),
            // easing: Easing.bounce
            // easing: Easing.elastic(3)
            // easing: Easing.bezier(.06,1,.86,.23)
        }).start(() => {
            //meteor explode size
            Animated.timing(state.meteorScale.current, {
                toValue: 10,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                //hide meteor after explode
                Animated.timing(state.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }).start(() => {
                    //reset meteor location and size
                    state.meteorAnim.current.setValue({x: 0, y: 0});
                    state.meteorScale.current.setValue(1);
                });
            });
        })
    ]);
};
