
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';

const Header = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'EduSABeginner-Medium': require('../fonts/Edu_SA_Beginner/static/EduSABeginner-Medium.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Landmark Lens</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#0A6DCA',
  },
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A6DCA',
  },
  text: {
    fontSize: 28,
    fontFamily: 'EduSABeginner-Medium',
    color: 'white',
  },
});

export default Header;



