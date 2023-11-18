import { useState, useEffect } from "react";
import getEnv from "./env";

import { getMyTopTracks, getAlbumTracks } from "./apiOptions";

const { ALBUM_ID } = getEnv();

function extractSongArtists(artists) {
  if (Array.isArray(artists)) {
    return artists.map((artist) => ({
      name: artist.name || null,
    }));
  } else {
    return [null];
  }
}

const useSpotifyTracks = (token) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (token) {
          const fetchedTracks = await getMyTopTracks(token);

          setTracks(fetchedTracks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTracks();
  }, [token]);
  return tracks;
};

export default useSpotifyTracks;
