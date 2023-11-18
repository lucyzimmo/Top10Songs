import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useGlobalSearchParams,
} from "expo-router";

export default function SongPreviewScreen() {
  const params = useLocalSearchParams();
  const { URL: previewUrl } = params;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Song preview" }} />
      <WebView
        source={{ uri: previewUrl }}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
}
