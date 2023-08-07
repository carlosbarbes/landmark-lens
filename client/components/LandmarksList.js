
import React, { useState, useCallback } from 'react'; // <-- Added useCallback here
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LandmarkItem from './LandmarkItem';

const LandmarksList = ({ userId }) => {
  const [visitedLandmarks, setVisitedLandmarks] = useState([]);
  const [mayVisitLandmarks, setMayVisitLandmarks] = useState([]);

  const fetchLandmarks = async () => {
    try {
      const res = await fetch(`http://192.168.0.12:3000/user/${userId}/landmarks`);
      const data = await res.json();

      console.log(data);

      const visited = data.filter(l => l.listType === 'visited');
      const mayVisit = data.filter(l => l.listType === 'mayVisit');

      setVisitedLandmarks(visited);
      setMayVisitLandmarks(mayVisit);

    } catch (err) {
      console.error(err);
    }
  };

  // Using useFocusEffect to fetch landmarks when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchLandmarks();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      {visitedLandmarks.length > 0 && (
        <>
          <Text style={styles.title}>Visited Landmarks</Text>
          {visitedLandmarks.map((landmark, index) =>
            <LandmarkItem key={index} landmark={landmark} onDelete={fetchLandmarks} />
          )}
        </>
      )}

      {mayVisitLandmarks.length > 0 && (
        <>
          <Text style={styles.title}>May Visit Someday</Text>
          {mayVisitLandmarks.map((landmark, index) =>
            <LandmarkItem key={index} landmark={landmark} onDelete={fetchLandmarks} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LandmarksList;



