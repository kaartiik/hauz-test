import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import TextBox from './src/components/TextBox';
import Grid from './src/components/Grid';
import maxCluster from './src/components/helper/oneSearch';

export default function App() {
  const [rowInput, setRowInput] = useState('');
  const [colInput, setColInput] = useState('');
  const [row, setRow] = useState([]);
  const [col, setCol] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const addValues = (text, index) => {
    let dataArray = [...inputData];
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      setInputData(dataArray);
    } else {
      dataArray.push({ text: text, index: index });
      setInputData(dataArray);
    }
  };

  const createMatrixAndSolve = () => {
    const output = inputData.map((rowItem) => {
      const arr = [...rowItem.text];
      const numberArr = arr.map(Number);
      return numberArr;
    });

    setMatrix(output);

    const outputCopy = output.map((item) => item.slice());

    const result = maxCluster(outputCopy);

    setFinalResult(result);
  };

  const reset = () => {
    setRowInput('');
    setColInput('');
    setRow([]);
    setCol([]);
    setMatrix([]);
    setInputData([]);
    setFinalResult(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' && 'padding'}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <TextBox
          label="No. of rows"
          value={rowInput}
          onChangeText={(text) => {
            setRowInput(text);
            if (text === '') setRow(Array.from(Array(parseInt(0)).keys()));
            else setRow(Array.from(Array(parseInt(text)).keys()));
          }}
        />
        <TextBox
          label="No. of columns"
          value={colInput}
          onChangeText={(text) => {
            setColInput(text);

            if (text === '') setCol(Array.from(Array(parseInt(0)).keys()));
            else setCol(Array.from(Array(parseInt(text)).keys()));
          }}
        />

        {row.length > 0 &&
          col.length > 0 &&
          row.map((item, idx) => (
            <TextBox
              key={idx}
              label={`Row ${idx + 1}`}
              maxColumn={Number(colInput)}
              onChangeText={(text) => {
                addValues(text, idx);
              }}
            />
          ))}

        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={row.length === 0 || col.length === 0}
          onPress={() => createMatrixAndSolve()}
        >
          <Text>Find Answer</Text>
        </TouchableOpacity>

        <Grid matrix={matrix} />

        <View style={styles.answerContainer}>
          {finalResult !== null && (
            <>
              <Text style={styles.answerText}>Answer: {finalResult}</Text>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => reset()}
              >
                <Text>Reset</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  answerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
