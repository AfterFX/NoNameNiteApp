import React, {useContext, useRef, useCallback, useState, Component, createContext} from 'react';
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

// credentials context
import { Health } from '../components/Health';

// console.log(Health)


const Battle = () => {
    const {storedHealth, setStoredHealth} = useContext(Health);


    // console.log(storedHealth.player.health)//continue here.... all states in one

    const [SkillMeta, setSkillMeta] = useState({});
    const [HpCurrent, setHpCurrent] = useState(100);
    const damage = 10; //percent how much minus from health

    const UseSkill = (skill: string) => {
        setHpCurrent(HpCurrent-damage);
        const HP = HpCurrent-damage;
        //render Animation states every time when using skill
        setSkillMeta(AnimationStates.skills[skill]);
        Avoid({skill: skill, HpLeft: HP,}, setStoredHealth);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[ styles.effect, { transform: [{ translateX: AnimValues.shake1 }] }]}>
                <View style={styles.Enemy}>
                    <Animated.View style={[ { transform: [{ translateY: AnimValues.enemy.move }] }]}>
                        <Avatar source={require("../assets/img/characters/Villain_Ozzie_drawn_ChronoTrigger.png")}/>
                    </Animated.View>
                    <Animated.View style={SkillMeta}/>
                    <HealthBar/>
                    <Animated.View style={[styles.damageContainer, {opacity: AnimValues.enemy.damage.opacity}, AnimValues.enemy.damage.positionXY.getLayout()]}>
                        <Text style={styles.damageText}>{damage}</Text>
                    </Animated.View>
                    <Text>{HpCurrent}</Text>
                </View>

                <Animated.View style={[ styles.Player, { transform: [{ translateY: AnimValues.player.move }] }]}>
                    <Avatar source={require("../assets/img/characters/CT1.jpeg")}/>
                </Animated.View>

                <View style={styles.skillsContainer}>
                    <View style={styles.skills}>
                        <TouchableOpacity onPress={() => UseSkill("meteor")}>
                                <ImageBackground source={require("../assets/img/skills/skill1.png")} style={styles.skillImage}>
                                    <Text style={styles.skill_title}>skill 1</Text>
                                </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => UseSkill("attack")}>
                            <ImageBackground source={require("../assets/img/skills/skill2.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 2</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack()}>
                            <ImageBackground source={require("../assets/img/skills/skill3.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 3</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack()}>
                            <ImageBackground source={require("../assets/img/skills/skill4.png")} style={styles.skillImage}>
                                <Text style={styles.skill_title}>skill 4</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => attack()}>
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
    },
    damageContainer: {
        position: "absolute",
        marginTop: -20,
        marginLeft: 50
    },
    damageText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#ffffff"
    }
});

export default Battle;