import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

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

const Welcome = () => {
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

    return (
        <KeyboardAvoidingWrapper>
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('../assets/img/img2.png')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>{name || 'John Deo'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'John.@gmail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                            <Line/>
                        <StyledButton
                            onPress={clearLogin}
                        >
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
        </KeyboardAvoidingWrapper>
    );
};



export default Welcome;