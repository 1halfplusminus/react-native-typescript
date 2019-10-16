/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Animated,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import styled from 'styled-components/native';

var ACTION_TIMER = 1000;
var COLORS = ['rgb(111,235,00)', 'rgb(111,235,62)'];

const useBackgroundAnimation = () => {
  const [state, setState] = useState({
    pressAction: new Animated.Value(0),
    value: 0,
    completed: false,
  });
  useEffect(() => {
    pressAction.addListener(v => setState({...state, value: v.value}));
  }, []);
  const {pressAction, value, completed} = state;
  const handlePressIn = () => {
    if (!completed) {
      Animated.timing(pressAction, {
        duration: ACTION_TIMER,
        toValue: 1,
      }).start(() => {
        setState({...state, completed: true});
      });
    }
  };
  const handlePressOut = () => {
    if (!completed) {
      Animated.timing(pressAction, {
        duration: value * ACTION_TIMER,
        toValue: 0,
      }).start();
    }
  };
  const getProgressStyle = () => {
    var bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    var width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });
    return {
      backgroundColor: bgColor,
      width: width,
    };
  };
  return {
    ...state,
    getProgressStyle,
    handlePressIn,
    handlePressOut,
  };
};
const Button = styled<typeof View>(Animated.createAnimatedComponent(View))`
  flex-direction: row;
  flex: 1;
  flex-basis: 10%;
  flex-grow: 0;
  background-color: red;
  border: 3px;
`;

const App = () => {
  const {
    handlePressIn,
    handlePressOut,
    getProgressStyle,
  } = useBackgroundAnimation();
  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <Button>
            <Animated.View
              style={[
                {
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                },
                getProgressStyle() as any,
              ]}
            />
            <Text> Coucou</Text>
          </Button>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default App;
