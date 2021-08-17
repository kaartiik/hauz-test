import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Grid({ matrix }) {
  return (
    <View style={styles.container}>
      {matrix.map((row, index) => (
        <View key={index} style={styles.colContainer}>
          {row.map((col, idx) => (
            <Text key={idx}>{col}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  colContainer: {
    flexDirection: 'row',
  },
});
