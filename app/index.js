import {
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { useLayoutEffect } from "react";

import { router, Link, useNavigation } from "expo-router";

import { useSpotifyAuth, useSpotifyTracks } from "../utils";
import Song from "./Song";
import { Images, Themes } from "../assets/Themes";
import spotifyLogo from "../assets/spotify-logo.png";

export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const tracks = useSpotifyTracks(token);

  //this portion below is used to block the header from appearing
  //it was inspired from this reference guide: https://docs.expo.dev/router/advanced/stack/
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const renderSong = ({ item, index }) => {
    return (
      <Link
        href={{
          pathname: "/songDetails",
          params: {
            URL: item.externalUrl,
          },
        }}
      >
        <Song
          index={index + 1}
          image={{ uri: item["imageUrl"] }}
          albumName={item["albumName"]}
          artist={item["songArtists"][0]["name"]}
          title={item["songTitle"]}
          duration={item["duration"]}
          previewUrl={item["previewUrl"]}
        />
      </Link>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <View style={styles.topTracks}>
          <View style={styles.titleBox}>
            <Image style={styles.spotifyLogo} source={spotifyLogo} />
            <Text style={styles.Title}> My Top Tracks </Text>
          </View>
          {tracks ? (
            <View>
              <FlatList
                style={{ flex: 1 }}
                data={tracks}
                keyExtractor={(item) => item.externalUrl}
                renderItem={renderSong}
              />
            </View>
          ) : (
            <Text> Loading</Text>
          )}
        </View>
      ) : (
        <View style={styles.box}>
          <Image style={styles.spotifyLogo} source={spotifyLogo} />
          <Button
            title="CONNECT WITH SPOTIFY"
            onPress={() => getSpotifyAuth()}
            color={"white"}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  box: {
    backgroundColor: "green",
    borderRadius: "50%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  spotifyLogo: {
    height: 20,
    width: 20,
  },
  songBox: {
    alignItems: "center",
  },
  topTracks: {
    alignItems: "center",
  },
  Title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
