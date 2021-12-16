import {View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Constants from 'expo-constants';
import React, {Component, useCallback, useRef, useState} from "react";

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

        // shift Attacker to the ahead
        Animated.timing(AnimValues.player, {
            toValue: -20,
            duration: 150,
            useNativeDriver: true
        }).start(() => {
            // shift Attacker to the back
            Animated.timing(AnimValues.player, {
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
                shake()
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

export const attack = (state: any) => {
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


export const HealthBar = (damage: number) => {

    const [value, setValue] = useState(0)
    const [PreValue, setPreValue] = useState(0)
    const state = {
        width: new Animated.Value(value-(value-PreValue))
    }
    console.log(damage)


    Animated.timing(state.width, {
        toValue: value,
        duration: 400,
        easing: Easing.bezier(0.45,0.05,0.55,0.95),
        useNativeDriver: false
    }).start()

    const handlePress = (choice: boolean) => {
        if(choice){
            setValue(value+10)
            setPreValue(value)
        }else{
            setValue(value-10)
            setPreValue(value)
        }

    }

    return(
        <View style={styles.healthBarContainer}>
            <View style={styles.healthBarBackground}>
                <Animated.View style={[styles.healthBarProgress, {
                    width: state.width.interpolate({
                        inputRange: [0, 100],
                        outputRange: [`0%`, '100%'],
                    }),
                    backgroundColor: state.width.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: ['rgba(248,7,7,0.8)', 'rgba(248,7,7,0.8)', 'rgba(30, 70, 30, 1.0)'],
                    }),
                }]}/>


            </View>
            {/*<TouchableOpacity onPress={() => handlePress(true)}>*/}
            {/*    <Text>Add value</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={() => handlePress(false)}>*/}
            {/*    <Text>Minus value</Text>*/}
            {/*</TouchableOpacity>*/}
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
        position: "relative",
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
    player: new Animated.Value(0),
    enemy: new Animated.Value(0),
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