
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const BottomButtons = ({ scrollY }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [fadeInOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
        if (value > 50) {
            Animated.timing(fadeInOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(fadeInOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    });

    return () => {
        scrollY.removeListener(listener);
    };
}, [scrollY]);


  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      let localUri = uri;
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });

      const imageResponse = await fetch('http://192.168.0.12:3000/detect', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const landmarkData = await imageResponse.json();
      navigation.navigate('LandmarkScreen', { landmark: landmarkData, image: uri });
    }
    setLoading(false);
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeInOpacity }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0A6DCA" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Detect landmark here</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    paddingVertical: 25,
  },
  button: {
    backgroundColor: '#0A6DCA',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BottomButtons;