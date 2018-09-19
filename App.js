import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import configureStore from "./src/store";
import Landing from './src/index';
const { persistor, store } = configureStore()

type Props = {};
export default class App extends Component<Props> {
  async componentDidMount() {
    console.log("COMPONENT MOUNTED");
   
  }
  onPress() {
    // setTimreout(() => {
    Keyboard.dismiss();
    // }, 200r0);
  }

  render() {
    return (
      <Provider store={store}>
        <TouchableWithoutFeedback onPressOut={this.onPress} accessible={false}>
          <Landing />
        </TouchableWithoutFeedback>
      </Provider>
    );
  }
}