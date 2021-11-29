import React, { useContext, useRef, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, StyleSheet, Animated, Dimensions, Image, TouchableOpacity, ImageBackground} from 'react-native';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from '../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

// or any pure javascript modules available in npm
import { Button } from 'react-native-paper';

const Battle = () => {
    // credentials context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const { name, email, photoUrl } = storedCredentials;

    const AvatarImg = photoUrl ? { uri: photoUrl } : require('../assets/img/img1.png');

    const clearLogin = () => {
      AsyncStorage.removeItem('natureCribCredentials')
          .then(() => {
              setStoredCredentials("");
          })
          .catch((error) => console.log(error));
    };

    const player = useRef(new Animated.Value(0));
    const enemy = useRef(new Animated.Value(0));

    const shake = useCallback(() => {
        // makes the sequence loop
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // Animated.delay(300),
                // shift element to the left by 2 units
                Animated.timing(player.current, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                }),
                // shift element to the right by 2 units
                Animated.timing(player.current, {
                    toValue: -20,
                    duration: 200,
                    useNativeDriver: false
                }),
                // bring the element back to its original position
                Animated.timing(player.current, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }),
            ]),
            // loops the above animation config 1 times
            { iterations: 1 }
        ).start();

        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // shift element to the left by 2 units
                Animated.timing(enemy.current, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: false
                }),
                // shift element to the right by 2 units
                Animated.timing(enemy.current, {
                    toValue: -20,
                    duration: 200,
                    useNativeDriver: false
                }),
                // bring the element back to its original position
                Animated.timing(enemy.current, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }),
            ]),
            // loops the above animation config 1 times
            { iterations: 1 }
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <>
                <Animated.View style={[ styles.Enemy, { transform: [{ translateY: enemy.current }] }]}>
                    <Avatar source={require("../assets/img/characters/Villain_Ozzie_drawn_ChronoTrigger.png")}/>
                </Animated.View>
            </>
            <>
                <Animated.View style={[ styles.Player, { transform: [{ translateY: player.current }] }]}>
                    <Avatar source={require("../assets/img/characters/CT1.jpeg")}/>
                </Animated.View>
                <View style={styles.skillsContainer}>

                    <View style={styles.skills}>
                        <TouchableOpacity onPress={shake}>
                            <ImageBackground source={require("../assets/img/skills/skill1.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 1</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={shake}>
                            <ImageBackground source={require("../assets/img/skills/skill2.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 2</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={shake}>
                            <ImageBackground source={require("../assets/img/skills/skill3.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 3</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={shake}>
                            <ImageBackground source={require("../assets/img/skills/skill4.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 4</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={shake}>
                            <ImageBackground source={require("../assets/img/skills/skill5.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 5</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                </View>
            </>
        </View>
    );
};
console.log(Dimensions.get('window'))
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#196b61',
        padding: 8,
    },
    Player: {
        position: "absolute",
        bottom: 100
    },
    Enemy: {
        position: "absolute",
        top: 100
    },
    skill_radius: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        width: 40

    },
    skillsContainer: {
       // margin: 30,
        display: "flex",
        position: "absolute",
        width: (Dimensions.get('window').width),
        height: 60,
        bottom: 10,
        maxWidth: 400,
        backgroundColor: '#726477',
        borderWidth: 2,
        borderColor: '#ffffff',


    },
    skills: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // padding:10
        // justifyContent: 'center',
        alignItems: 'center',
        flex:2,
        flexDirection:"row",
        justifyContent:'space-between',
        paddingLeft: 2,
        paddingRight: 2
    },
    skill_title: {
        fontSize: 8,
        color: "#fff",
        borderBottomWidth: 2,
        borderRightWidth: 2,
        width: 25,
        borderColor: "#ee8989"
    },
    skillImage: {
        height: 50,
        width: 50
    }
});

export default Battle;