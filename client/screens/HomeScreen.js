
import React from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import LandmarksList from '../components/LandmarksList';
import BottomButtons from '../components/BottomButtons';

export default function HomeScreen() {
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <LandmarksList userId="09876" />
      </ScrollView>
      <BottomButtons scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  }
});

