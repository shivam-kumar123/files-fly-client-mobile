import { 
  SafeAreaView, 
  Text, 
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  View,
  Button,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useState, useEffect } from 'react';
import { FileInput } from './components/FileInput';
import { DownloadInput } from './components/DownloadInput';

const App = () => {
  
  const [code, setCode] = useState<string>('');
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isFilePicked , setIsFilePicked] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isInDownload, setIsInDownload] = useState<boolean>(false);

  const formatFileName = (name : string) => {
    if (name && name.length > 30) {
      const firstPart = name.substring(0, 10);
      const fileExtension = name.split('.').pop();
      return `${firstPart}.${fileExtension}`;
    }
    return name;
  };
  
  const handleTabNavigation = (calledBy: string) => {
    if (calledBy === 'upload') {
      setIsInDownload(false);
    } else if (calledBy === 'download') {
      setIsInDownload(true);
    }
  };

  const handleCopyCode = () => {
    Clipboard.setString(code);
    ToastAndroid.showWithGravity(
      'Code Copied to Clipboard',
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    setSpinner(false);
    setIsFilePicked(false);
    
    if (code !== '') {
      // Set a timeout to simulate a reload after 200 seconds
      const reloadTimeout = setTimeout(() => {
        setCode(''); 
        setFileName(null);
        setIsFilePicked(false);
      }, 200000); // 200 seconds
      // Clear the timeout if the component unmounts or code changes before the timeout
      return () => clearTimeout(reloadTimeout);
    }
  }, [code]);

  return (
    <SafeAreaView style={ styles.appBackgroundColor }>

      {
        isInDownload ? 
        <Text style={[styles.fileInfo, {
          fontSize: 30
        }]} >Download File</Text> : 
        <Text style={[styles.fileInfo, {
          fontSize: 30
        }]} >Upload File</Text>
      }

      {
        fileName !== null && isInDownload === false &&
        <Text style={styles.fileInfo}>
          {formatFileName(fileName)}
        </Text>
      }

      {
        spinner ? 
        isInDownload === false && <ActivityIndicator size='large' color={'midnightblue'} style={{
          marginTop: 50,
        }} /> :
        isInDownload === false && 
        <FileInput
        setCode={setCode}
        setSpinner={setSpinner}
        isFilePicked={isFilePicked}
        setIsFilePicked={setIsFilePicked}
        setFileName={setFileName}
      />
      }

      {
        code !== '' && isInDownload === false && 
        <View>
           <Text style={[styles.fileInfo, {
              fontSize: 28,
            }]}>
              file code: {code}
          </Text>
          <View style={styles.btn}>
            <Button 
              title='copy code' 
              onPress={handleCopyCode}
            />
          </View>
        </View>
      }

      {
        isInDownload && 
        <DownloadInput fileName={fileName} />
      }

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => handleTabNavigation('upload')}
            underlayColor="transparent"
            style={styles.button}
          >
            <Text style={[styles.navigationBtn, {
              color: isInDownload ? 'grey' : 'blue',
            }]}>Upload</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handleTabNavigation('download')}
            underlayColor="transparent"
            style={styles.button}
          >
            <Text style={[styles.navigationBtn, {
              color: isInDownload ? 'blue' : 'grey'
            }]}>
              Download
            </Text>
          </TouchableHighlight>
        </View>
    </View>

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appBackgroundColor: {
    flex: 1,
    color: 'white',
  },
  fileInfo: {
    fontSize: 22,
    textAlign:'center',
    marginTop: 40,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align items at the bottom of the screen
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    paddingHorizontal: 20, // Add padding for better spacing
  },
  button: {
    flex: 1, // Each button takes equal space
  },
  btn: {
    marginTop: 50,
    marginLeft: 80,
    marginRight: 80,
  },
  navigationBtn: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
});