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

import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const HTMLtest = () => {
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

    function onElement(element) {
        console.log(element.attribs)
        // Remove the first two children of an ol tag.
        if (element.tagName === 'ol') {
            let i = 0;
            for (const child of element.children) {
                // Children might be text node or comments.
                // We don't want to count these.

            }
        }
    }

    const tagsStyles = {
        body: {
            textAlign: 'center',
            color: 'red'
        },
        a: {
            color: 'green'
        }
    }
    const domVisitors = {
        onElement: onElement
    };
    const source = {
        html: `
<div id="kk123">
  Hello World!
</div>`
    };
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={tagsStyles}
            domVisitors={domVisitors}
        />
    );
};



export default HTMLtest;