
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn({ onSignIn }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '997836173651-suke0lm40ksnhkq4qv50e3u883dv1sgq.apps.googleusercontent.com',
      redirectUri: 'https://auth.expo.io/@carlosbarbes/landmarklens',
    },
    {
      responseType: ResponseType.Token,
    }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const decodedToken = jwtDecode(id_token);
      console.log(decodedToken);
      onSignIn(decodedToken);
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.googleButton}
      onPress={() => {
        promptAsync();
      }}
      disabled={!request}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
