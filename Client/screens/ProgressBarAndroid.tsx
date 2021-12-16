import * as React from 'react';
import {View, TouchableOpacity, Text, Animated, StyleSheet, Easing} from "react-native";
import {useState} from "react";

const MyComponent = () => {
    const [value, setValue] = useState(0)
    const [PreValue, setPreValue] = useState(0)
    const state = {
        width: new Animated.Value(value-(value-PreValue))
    }
    console.log(value, PreValue)


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
            <TouchableOpacity onPress={() => handlePress(true)}>
                <Text>Add value</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(false)}>
                <Text>Minus value</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    healthBarContainer: {
        marginTop: 300,
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
})

export default MyComponent;
