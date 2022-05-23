import React, { useState } from 'react'
import { FlatList, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo'
import Sandbox from './components/sandbox'

export default function App() {
  
  const [ todos, setTodos ] = useState([
    { text: 'This is the First item on the list', key: 1 },
      { text: 'This is the Second item on the list', key: 2 },
      { text: 'This is the Third item on the list', key: 3 }
  ])
  
  const pressHandler = (key: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }


  const submitHandler = (text: string) => {
    if(text.length > 5) {
      setTodos((prevTodos) => {
          return [
              { text: text, key: Math.random() },
              ...prevTodos
          ]
      })
    } else {
      Alert.alert('sorry!', 'a Todo item must be over 5 characters long', [
        {text: 'Got it', onPress: () => console.log('alert ended')}
      ])
    }
  }

  return (
    //<Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
      console.log('Dismissed keyboard')
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={ submitHandler } />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={ item } pressHandler={ pressHandler } />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop:20,
  }
});
