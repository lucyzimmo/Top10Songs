import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import { Images, Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Link } from "expo-router";

const Song = ({
  index,
  image,
  title,
  artist,
  albumName,
  duration,
  previewUrl,
  externalUrl,
}) => {
  const actual_duration = millisToMinutesAndSeconds(duration);
  return (
    <SafeAreaView style={songStyles.container}>
      <View style={songStyles.songRow}>
        <View style={songStyles.index}>
          <Link
            href={{
              pathname: "/songPreview",
              params: {
                URL: previewUrl,
              },
            }}
          >
            <Ionicons name="play-circle" size={32} color="green" />
          </Link>
        </View>
        <View style={songStyles.imageBox}>
          <Image style={songStyles.image} source={image} />
        </View>
        <View style={songStyles.songTitleBox}>
          <Text style={songStyles.whiteText} numberOfLines={1}>
            {title}
          </Text>
          <Text style={songStyles.greyText} numberOfLines={1}>
            {artist}
          </Text>
        </View>
        <View style={songStyles.albumBox}>
          <Text style={songStyles.whiteText} numberOfLines={1}>
            {albumName}
          </Text>
        </View>
        <View style={songStyles.duration}>
          <Text style={songStyles.whiteText} numberOfLines={1}>
            {actual_duration}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Song;

const songStyles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  songRow: {
    backgroundColor: Themes.colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingLeft: 5,
  },
  whiteText: {
    color: "white",
  },
  greyText: {
    color: "grey",
  },
  imageBox: {
    width: 60,
    marginRight: 8,
  },
  image: {
    height: 50,
    width: 50,
    aspectRatio: 1,
  },
  index: {
    width: 40,
  },
  songTitleBox: {
    width: 150,
  },
  albumBox: {
    width: 120,
  },
  duration: {
    width: 100,
  },
});
