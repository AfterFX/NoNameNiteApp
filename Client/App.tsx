import React, { useState } from 'react';

// React navigation stack
import RootStack from './navigators/RootStack';

// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';
import { Health } from "./components/Health";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [storedHealth, setStoredHealth] = useState(0);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('natureCribCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
        <Health.Provider value={{ storedHealth, setStoredHealth }}>
            <RootStack />
        </Health.Provider>
    </CredentialsContext.Provider>
  );
}


global.Server = { ip: "http://192.168.1.47:8081" };