import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function TextBox({ label, value, maxColumn, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text>{label}: </Text>
      <TextInput
        style={styles.inputContainer}
        keyboardType="numeric"
        maxLength={maxColumn}
        value={value}
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    height: 38,
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 5,
  },
});
