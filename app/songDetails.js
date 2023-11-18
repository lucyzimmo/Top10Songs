import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

import { router, Link, useLocalSearchParams, Stack } from "expo-router";

export default function SongDetailsScreen() {
  const params = useLocalSearchParams();
  const { URL: externalUrl } = params;
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Song details" }} />
      <WebView
        startInLoadingState={true}
        source={{ uri: externalUrl }}
        style={{ flex: 1, marginBottom: 0 }}
      />
    </View>
  );
}
