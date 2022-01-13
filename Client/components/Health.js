import React, { Component, createContext } from "react";
import {Text} from 'react-native';


export const Health = createContext({ storedHealth: {}, setStoredHealth: () => {} });

