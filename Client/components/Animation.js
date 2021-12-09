import styled from 'styled-components';
import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import {Component, useCallback} from "react";
import alert from "react-native-web/dist/exports/Alert";

const StatusBarHeight = Constants.statusBarHeight;

export const skillUse = (state, skill) => {

    if(skill === "meteor"){
        meteor(state)
    }else if(skill === "shake"){
        shake(state)
    }
}


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

export class SkillUse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            skillAnim: props.skillAnim
        };

       this.state.skillAnim = [{opacity: props.opacity, transform: [ { scale: props.meteorScale.current } ], marginTop: props.AnimationPositionX, marginLeft: props.AnimationPositionY}, props.meteorAnim.current.getLayout(), styles.meteor]

        props.opacity.setValue(1)
        const meteorDistance = 1000;
        //set meteor start position
        props.AnimationPositionX.setValue(320+meteorDistance);
        props.AnimationPositionY.setValue(210+meteorDistance);
        //meteor moving
        Animated.timing(props.meteorAnim.current, {
            useNativeDriver: false,
            toValue: {x: (-170+(-meteorDistance)), y: (-270+(-meteorDistance))},
            duration: 750,
            // easing: Easing.back(5),
            // easing: Easing.bounce
            // easing: Easing.elastic(3)
            // easing: Easing.bezier(.06,1,.86,.23)
        }).start(() => {
            //meteor explode size
            Animated.timing(props.meteorScale.current, {
                toValue: 10,
                duration: 100,
                useNativeDriver: false
            }).start(() => {
                //hide meteor after explode
                Animated.timing(props.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }).start(() => {
                    //reset meteor location and size
                    props.meteorAnim.current.setValue({x: 0, y: 0});
                    props.meteorScale.current.setValue(1);
                });
            });
        })
    }
    componentDidMount() {
        this.setState({ skillAnim: 1 })
    }

    render() {
        this.setState({ skillAnim: 1 })
        return (
            <Text>awfawfawf</Text>
        );
    }
}

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