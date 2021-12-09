import React, {useContext, useRef, useCallback, useState, Component} from 'react';
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


import {meteor, shake, skillUse} from '../components/Animation'
import {SkillUse} from '../components/Animation'

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
    const state = {
        player: useRef(new Animated.Value(0)),
        enemy: useRef(new Animated.Value(0)),
        meteorAnim: useRef(new Animated.ValueXY({x: 0, y: 0})),
        meteorScale: useRef(new Animated.Value(1)),
        opacity: new Animated.Value(0),
        AnimationPositionX: new Animated.Value(0),
        AnimationPositionY: new Animated.Value(0),
    }

    return (
        <View style={styles.container}>
            <>
                <Animated.View style={[ styles.Enemy, { transform: [{ translateY: state.enemy.current }] }]}>
                    <Avatar source={require("../assets/img/characters/Villain_Ozzie_drawn_ChronoTrigger.png")}/>
                    <Animated.View  style={[new SkillUse(state).state.skillAnim]}/>
                </Animated.View>
            </>
            <>

                <Animated.View style={[ styles.Player, { transform: [{ translateY: state.player.current }] }]}>
                    <Avatar source={require("../assets/img/characters/CT1.jpeg")}/>
                </Animated.View>

                <View style={styles.skillsContainer}>
                    <View style={styles.skills}>
                        <TouchableOpacity onPress={() => new SkillUse(state)}>
                                <ImageBackground source={require("../assets/img/skills/skill1.png")} style={styles.skillImage}>
                                    <Text style={styles.skill_title}>skill 1</Text>
                                </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => [state.opacity.setValue(1), meteor(state.opacity, state.meteorAnim, state.meteorScale)]}>
                            <ImageBackground source={require("../assets/img/skills/skill2.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 2</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => shake(state)}>
                            <ImageBackground source={require("../assets/img/skills/skill3.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 3</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => shake(state)}>
                            <ImageBackground source={require("../assets/img/skills/skill4.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 4</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => shake(state)}>
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
// console.log(Dimensions.get('window'))
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