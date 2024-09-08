import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, Alert, FlatList } from 'react-native';
import { AuthContext } from '../hooks/AuthProvider';
import { getPoints } from '../fetch/BookEventFetch';

const Wordle = () => {
  const { user, setUser } = useContext(AuthContext);
  const WORD_LENGTH = 5;
  const MAX_ATTEMPTS = 6;
  const [word, setWord] = useState('null');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    async function fetchWord() {
      try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data[0]);
        setWord(data[0].toUpperCase());
      } catch (error) {
        console.log("API call error:", error);
        alert(error.message);
      }
    }
    fetchWord();
  }, []);

  useEffect(() => {
    async function updatePoints() {
      if (win) {
        const data = await getPoints(user.id, 200); 
        setUser(data);
        setWin(false); 
      }
    }
    updatePoints();
  }, [win]);


  async function restart() {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setWord(data[0].toUpperCase()); 
      setGuesses([]);
      setGameOver(false);
      setCurrentGuess('');
    } catch (error) {
      console.log("API call error:", error);
    }
  }

  
  const handleGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      Alert.alert("Неправильна!", "Нужна 5 букв");
      return;
    }

    const formattedGuess = currentGuess.toUpperCase();
    setGuesses([...guesses, formattedGuess]);

    if (formattedGuess === word) {
      Alert.alert("Молодец!", `200 пойнтов плюс к уровню ${user.level}`);
      setGameOver(true);
      setWin(true); 
    } else if (guesses.length + 1 === MAX_ATTEMPTS) {
      Alert.alert("Проиграли!", `Слово было: ${word}`);
      setGameOver(true);
    }

    setCurrentGuess(''); 
  };


  const renderRow = (guess) => {
    return (
      <View style={styles.row}>
        {Array.from(guess).map((letter, index) => {
          const correct = word[index] === letter;
          const present = word.includes(letter) && !correct;

          const backgroundColor = correct
            ? '#6aaa64'
            : present
            ? '#c9b458' 
            : '#787c7e'; 

          return (
            <View key={index} style={[styles.cell, { backgroundColor }]}>
              <Text style={styles.cellText}>{letter}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Познай Англиский</Text>

      <FlatList
        data={guesses}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => (
          <View>
            {!gameOver && (
              <TextInput
                style={styles.input}
                value={currentGuess}
                onChangeText={setCurrentGuess}
                placeholder="Enter 5-letter word"
                maxLength={WORD_LENGTH}
                editable={!gameOver}
              />
            )}
            {!gameOver ? (
              <Button title="Проверить" onPress={handleGuess} />
            ) : (
              <Button title="Начать Заново?" onPress={restart} />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121213',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#787c7e',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Wordle;
