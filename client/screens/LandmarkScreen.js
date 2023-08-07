
import React from 'react';
import { Button, View, Text, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';

export default function LandmarkScreen({ route, navigation }) {
  const { landmark: serverLandmark } = route.params.landmark;
  const { image } = route.params;

  const landmark = {
    ...serverLandmark,
    image,
  };

  if (!landmark) {
    return <Text>Loading...</Text>;
  }
  //else {console.log(landmark)};

  const discardImage = () => {
    navigation.goBack();
  };

  const saveImage = async () => {
    Alert.alert('Save to List', 'Select a list to save this landmark to', [
      { text: 'Visited Landmarks', onPress: () => saveLandmark('visited') },
      { text: 'May Visit Someday', onPress: () => saveLandmark('mayVisit') },
    ]);
  };



  const saveLandmark = async (listType) => {
    const userId = "09876";

    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('listType', listType);
    formData.append('landmark', JSON.stringify(landmark));

    formData.append('image', {
      uri: landmark.image,
      name: 'image.jpg',
      type: 'image/jpeg'
    });

    const response = await fetch('http://192.168.0.12:3000/landmark/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });

    if (response.ok) {
      //Alert.alert('Success', 'Landmark saved successfully!');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save landmark');
    }
  };

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: landmark.image }} contentFit='cover' />
        <Text style={styles.title}>{landmark.description}</Text>
        <View style={styles.buttonContainer}>
        <Button title="Discard" onPress={discardImage} />
        <Button title="Save" onPress={saveImage} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  address: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});



