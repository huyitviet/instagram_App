
import React, { Component } from 'react';
import {View, Text, } from 'react-native'

import firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBIufqNubUl-SlxB6WmT71mbmt65p1cIh4",
  authDomain: "instagram-dev-aafad.firebaseapp.com",
  projectId: "instagram-dev-aafad",
  storageBucket: "instagram-dev-aafad.appspot.com",
  messagingSenderId: "991032507328",
  appId: "1:991032507328:web:e9bcc0eb700bf3caa92625",
  measurementId: "G-K1LF5198PL"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}> 
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteNam="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }

    return(
      <Provider store={store}>
        <MainScreen/> 
      </Provider>
      
      )
    }
}

export default App


