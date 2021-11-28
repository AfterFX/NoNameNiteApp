import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

//colors
import { Colors } from './styles';
const { primary } = Colors;

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: primary }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
