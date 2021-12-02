import styled from 'styled-components';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated} from 'react-native';
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
