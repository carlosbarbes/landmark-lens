
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function GoogleAuth() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '997836173651-v8hfkcnfgd3g7hdjpkcertkssa5qeioo.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({
        native: 'com.googleusercontent.apps.997836173651-v8hfkcnfgd3g7hdjpkcertkssa5qeioo',
        useProxy: false,
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      const fetchAccessToken = async () => {
        try {
          const tokenResponse = await Google.exchangeCodeAsync({
            clientId: '997836173651-suke0lm40ksnhkq4qv50e3u883dv1sgq.apps.googleusercontent.com',
            code,
          });
          console.log(tokenResponse);
        } catch (err) {
          console.error("Error fetching access token", err);
        }
      };

      fetchAccessToken();
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}

