import { 
  SafeAreaView, 
  Text, 
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { FileInput } from './components/FileInput';
import { DownloadInput } from './components/DownloadInput';
import BottomSheet from 'react-native-simple-bottom-sheet';

const App = () => {
  
  const [code, setCode] = useState<String>('');
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isFilePicked , setIsFilePicked] = useState<boolean>(false);
  const [fileName, setFileName] = useState<String | null>(null);
  const panelRef = useRef<any>(null);

  
  useEffect(() => {
    setSpinner(false);
    setIsFilePicked(false);
    
    if (code !== '') {
      // Set a timeout to simulate a reload after 200 seconds
      const reloadTimeout = setTimeout(() => {
        setCode(''); 
      }, 200000); // 200 seconds
      // Clear the timeout if the component unmounts or code changes before the timeout
      return () => clearTimeout(reloadTimeout);
    }
  }, [code]);

  return (
    <SafeAreaView style={ styles.appBackgroundColor }>
      <Text style={styles.heading}>Files Fly</Text>

      {
        fileName !== null && 
        <Text style={styles.fileInfo}>
          {fileName}
        </Text>
      }

      <FileInput
        setCode={setCode}
        setSpinner={setSpinner}
        isFilePicked={isFilePicked}
        setIsFilePicked={setIsFilePicked}
        setFileName={setFileName}
      />

      {spinner && <ActivityIndicator size='large' color={'midnightblue'} />}

      {
        code !== '' && 
        <BottomSheet ref={ref => panelRef.current = ref}>
          <Text style={styles.bottomSheet}>
            file code: {code}
          </Text>
        </BottomSheet>
      }

      <DownloadInput 
        fileName={fileName}
      /> 

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appBackgroundColor: {
    backgroundColor: 'honeydew',
    flex: 1,
  },
  heading: {
    fontSize: 30,
    paddingTop: 20,
    textAlign: 'center',
    color: 'black',
  },
  fileInfo: {
    fontSize: 22,
    textAlign:'center',
    marginTop: 70,
    color: 'black',
  },
  bottomSheet: {
    paddingVertical: 20,
    fontSize: 28,
    color: 'black',
    zIndex: 1,
  }
 
});