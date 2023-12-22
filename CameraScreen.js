import { StyleSheet, Text, View, Platform, Alert, Button } from 'react-native';
import * as React from 'react';
import {useState, useEffect } from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  
  let device = useCameraDevice('back');
 
  const [scannedCodes, setScannedCodes] = useState([]);
  const [isScanningAllowed, setScanningAllowed] = useState(true); // State to control scanning
  const { hasPermission, requestPermission } = useCameraPermission();
  const[isgranted, setIsGranted]= useState(false)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }else{
      setIsGranted(true);
    }
  },[hasPermission]);  


  console.log(hasPermission);
 
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (isScanningAllowed) {
        setScanningAllowed(false); // Disable scanning after the first scan
        console.log(`Scanned ${codes[0].value} codes!!`);
        setScannedCodes(codes);
      }
    },
  });


  if (!device) {
    return <Text>Camera is not found!</Text>;
  }

  

  return (
    <View style={ styles.box}>
      {hasPermission && isgranted  &&  (<Camera style={StyleSheet.absoluteFill} device={device} codeScanner={codeScanner} isActive={true} />)}     
      {scannedCodes.length > 0 && (
        <View style={styles.overlay}>
          <Text>Scanned Codes:</Text>
          {scannedCodes.map((code, index) => (
            <Text key={index}>{code.value}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  alertMsg: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 5,
  },
  box:{
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
