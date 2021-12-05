import styled from 'styled-components';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import {useCallback} from "react";

const StatusBarHeight = Constants.statusBarHeight;


export const shake = (player, enemy) => {
    // makes the sequence loop
    Animated.loop(
        // runs the animation array in sequence
        Animated.sequence([
            // Reset Attacker position
            Animated.timing(player.current, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }),
            // shift Attacker to the ahead
            Animated.timing(player.current, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true
            }),
        ]),
        // loops the above animation config 1 times
        { iterations: 1 }
    ).start(() => {
        // shift Attacker to the back
        Animated.timing(player.current, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start()
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // Reset Defender position
                Animated.timing(enemy.current, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),
                // shift Defender to the push back
                Animated.timing(enemy.current, {
                    toValue: -20,
                    duration: 150,
                    useNativeDriver: true
                }),
                // Reset Defender position
                Animated.timing(enemy.current, {
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

export const meteor = (opacity, meteorAnim, meteorScale, testX, testY) => {
    Animated.sequence([
        testX.setValue(300),
        testY.setValue(190),
        //meteor moving
        Animated.timing(meteorAnim.current, {
            useNativeDriver: false,
            toValue: {x: -170, y: -270},
            duration: 1500,
            // easing: Easing.back(5),
            // easing: Easing.bounce
            // easing: Easing.elastic(3)
            // easing: Easing.bezier(.06,1,.86,.23)
        }).start(() => {
            //meteor explode size
            Animated.timing(meteorScale.current, {
                toValue: 2,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                //hide meteor after explode
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }).start(() => {
                    //reset meteor location and size
                    meteorAnim.current.setValue({x: 0, y: 0});
                    meteorScale.current.setValue(1);
                });
            });
        })
    ]);
};
