import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {alerts, colors, mapNavigations} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/MarkerModal';
import useModal from '@/hooks/useModal';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const {data: markers = []} = useGetMarkers();
  const markerModal = useModal();
  const {userLocation, isUserLocationError} = useUserLocation();

  usePermission('LOCATION');

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    moveMapView(userLocation);
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        region={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}

        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons
            name="add"
            color={colors.WHITE}
            size={25}
            style={{position: 'absolute', top: 10}}
          />
        </Pressable>

        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons
            name="my-location"
            color={colors.WHITE}
            size={25}
            style={{position: 'absolute', top: 10}}
          />
        </Pressable>
      </View>

      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    borderRadius: 30,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative',
  },
});

export default MapHomeScreen;
