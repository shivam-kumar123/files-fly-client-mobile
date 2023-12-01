import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';


export const DownloadInput = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const notificationSound = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Failed to load the sound', error);
    } else {
      notificationSound.setVolume(0.7);
    }
  });  

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Files Fly Storage Permission',
          message:
            'This App needs access to your Storage ' +
            'to Download Files',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.showWithGravity(
                'Storage permission denied. Please grant permission to download files.',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
            );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDownloadFile = async () => {
    setInputCode('');
    if (inputCode.length !== 6) {
      setErrorMsg('Enter a Valid Code');
    } else {
      await requestStoragePermission();
      const fileURL = `https://files-fly-server-mobile.onrender.com/download/${inputCode}`;
      const { config, fs } = RNFetchBlob;
      const date = new Date();
      try {
        ToastAndroid.showWithGravity(
            'File download Started!',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        const filePath = fs.dirs.DownloadDir;

        const res = await config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'File Download',
            // path: filePath + '/download_' + fileName,
            path: filePath + '/download_',
            description: 'File Download',
          },
        }).fetch('GET', fileURL);

        // console.log('File downloaded to:', res.path());

        // Show a success message to the user
        ToastAndroid.showWithGravity(
          'File download successfull!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        try {
          notificationSound.play((success) => {
            if (success) {
              console.log('Notification sound played successfully');
            } else {
              console.error('Notification sound failed to play');
            }
          });
        } catch (error) {
          console.error('Error downloading file:', error);
        }
        
      } catch (error) {
        console.error('Error downloading file:', error);

        // Show an error message to the user
        ToastAndroid.showWithGravity(
          'Failed to download file. Please try again.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }
  };

  const handleInputCode = (text: string) => {
    setErrorMsg('');
    setInputCode(text);
  };

  return (
    <View>
      <Text
        style={styles.text}
      >
        Download File
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={handleInputCode}
        placeholder="Enter 6-digit Code"
        placeholderTextColor={'#000'}
        value={inputCode}
      />

      <View style={styles.btn}>
        <Button title="Download File" onPress={handleDownloadFile} />
      </View>

      {errorMsg !== '' && (
        <Text
          style={styles.err}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    marginTop: 50,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  btn: {
    marginTop: 25,
    marginLeft: 50,
    marginRight: 50,
  },
  err: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
    color: 'black',
  },
});
