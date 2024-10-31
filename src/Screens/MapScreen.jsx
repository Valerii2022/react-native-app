import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { colors } from "../../styles/common";

import { tempPosts } from "../../assets/tempData/posts";

const Map = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const currentPost = tempPosts.find((post) => post.id === route.params.id);

      const coords = {
        latitude: currentPost.location.latitude,
        longitude: currentPost.location.longitude,
      };

      setLocation(coords);
      setTitle(currentPost.title);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location ? location.latitude : 32.78825,
          longitude: location ? location.longitude : -100.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location !== null && <Marker title={title} coordinate={location} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
