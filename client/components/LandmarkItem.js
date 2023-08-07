import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

const LandmarkItem = ({ landmark, onDelete }) => {
  const imageUrl = `http://192.168.0.12:3000/${landmark.image}`;
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('ImageViewer', { imageUrl, description: landmark.description });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://192.168.0.12:3000/landmark/delete/${landmark._id}`, {
        method: 'DELETE',
      });
      console.log(landmark._id);
      if (!res.ok) {
        throw new Error('Could not delete landmark');
      }

      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImagePress}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.textAndButtonContainer}>
        <Text style={styles.name}>{landmark.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#00CCBC',
    borderRadius: 20,
    paddingBottom: 11,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 100,
  },
  button: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    color: '#00CCBC',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LandmarkItem;

