
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Button as RNButton
} from 'react-native';
const {width, height, scale} = Dimensions.get('window');
export function Button({title, onPress, color}) {
  return (
    <View style={styles.container}>
      <RNButton title={title} onPress={onPress} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    marginHorizontal: 0,
    height: 50,
    lineHeight: 50,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    paddingTop: 6,
  },
});