
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

export default function ImageViewerScreen({ route, navigation }) {
  const { imageUrl, description } = route.params;

  return (
    <LinearGradient colors={['#0A6DCA', '#00CCBC']} style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.title}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
        <Text style={styles.exitButtonText}>X</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '40%',
    contentFit: 'cover',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: '10%',
    fontWeight: 'bold',
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  exitButton: {
    position: 'absolute',
    top: 55,
    right: 30,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -4
  },
});

