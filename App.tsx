/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import { ToDoItem } from './components/TodoItem';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Todo List</Text>
          <ToDoItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
