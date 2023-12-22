import * as React from 'react';
import { Button, View, StyleSheet,Text} from 'react-native';
import { useEffect } from 'react';

import {
    useCameraPermission,
    useCameraDevice,
    Camera,
    useCodeScanner,
  } from 'react-native-vision-camera';


export default function Home({ navigation }) {
    // const { hasPermission, requestPermission } = useCameraPermission();
    



    // useEffect(() => {
    //     if (!hasPermission) {
    //       requestPermission();
    //     }
    //   },[]);
    //   console.log(hasPermission)



    //   if (!hasPermission) {
    //     return <Text>Camera permission not granted!</Text>;
    //   }

  return (
    <View style={styles.container}>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('CameraScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
