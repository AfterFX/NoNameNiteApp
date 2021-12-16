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


import {
    attack,
    AnimValues,
    Avoid,
    AnimationStates,
    HealthBar
} from '../components/Animation'

import {
    getHealthBarBackgroundColor,
    defaultColorPallet,
    hexColorRegex
} from './util/HealthBarUtils';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';


const Battle = () => {
    const [SkillMeta, setSkillMeta] = useState({});
    const UseSkill = (skill: string) => {
        //render Animation states every time when using skill
        setSkillMeta(AnimationStates.skills[skill])
        new Avoid({props: {skill: skill}})
    };
    const percentage = 1;
    const colors = defaultColorPallet;

    // console.log( getHealthBarBackgroundColor(percentage, colors))

    return (
        <View style={styles.container}>
            <Animated.View style={[ styles.effect, { transform: [{ translateX: AnimValues.shake1 }] }]}>
                <Animated.View style={[ styles.Enemy, { transform: [{ translateY: AnimValues.enemy }] }]}>
                    <Avatar source={require("../assets/img/characters/Villain_Ozzie_drawn_ChronoTrigger.png")}/>
                    <Animated.View style={SkillMeta}/>
                    <HealthBar/>
                </Animated.View>

                <Animated.View style={[ styles.Player, { transform: [{ translateY: AnimValues.player }] }]}>
                    <Avatar source={require("../assets/img/characters/CT1.jpeg")}/>
                </Animated.View>

                <View style={styles.skillsContainer}>
                    <View style={styles.skills}>
                        <TouchableOpacity onPress={() => UseSkill("meteor")}>
                                <ImageBackground source={require("../assets/img/skills/skill1.png")} style={styles.skillImage}>
                                    <Text style={styles.skill_title}>skill 1</Text>
                                </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => new Avoid({props: {skill: "meteor"}})}>
                            <ImageBackground source={require("../assets/img/skills/skill2.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 2</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack(AnimValues)}>
                            <ImageBackground source={require("../assets/img/skills/skill3.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 3</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack(AnimValues)}>
                            <ImageBackground source={require("../assets/img/skills/skill4.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 4</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack(AnimValues)}>
                            <ImageBackground source={require("../assets/img/skills/skill5.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 5</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        </View>
    );
};
// console.log(Dimensions.get('window'))
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#196b61',
        padding: 8,
        justifyContent: 'center',
    },
    effect: {
        flex: 1,
        alignItems: 'center',
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
    },
    meteor: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#ff592c',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Battle;