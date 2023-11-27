import { 
  SafeAreaView, 
  Text, 
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { FileInput } from './components/FileInput';
import { DownloadInput } from './components/DownloadInput';
import ToggleSwitch from 'toggle-switch-react-native';

const App = () => {
  
  const [code, setCode] = useState<String>('');
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFilePicked , setIsFilePicked] = useState<boolean>(false);
  const [fileName, setFileName] = useState<String | null>(null);

  const toggleDarkMode = (isOn: boolean) => {
    setIsDarkMode(isOn);
  };
  
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
    <SafeAreaView style={[styles.appBackgroundColor, { backgroundColor: isDarkMode ? 'black' : 'honeydew' }]}>
      <Text style={[styles.heading, {
        color: isDarkMode ? 'white' : 'black'
      }]}>Files Fly</Text>

      <ToggleSwitch
        isOn={isDarkMode}
        onColor="white"
        offColor="black"
        size="medium"
        onToggle={toggleDarkMode}
        style={styles.toggleBtn}
      />

      {
        fileName !== null && 
        <Text style={[styles.fileInfo, {
          color: isDarkMode ? 'white' : 'black'
        }]}>
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

      {code !== '' && <Text style={[styles.heading, {
        color: isDarkMode ? 'white' : 'black'
      }]}>CODE: {code}</Text>}

      {spinner && <ActivityIndicator size='large' color={isDarkMode ? 'white' : 'midnightblue'} />}

      <DownloadInput 
        isDarkMode={isDarkMode}
        fileName={fileName}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appBackgroundColor: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    paddingTop: 20,
    textAlign: 'center',
  },
  toggleBtn:{
    position: 'absolute',
    top: 28, 
    right: 40, 
  },
  fileInfo: {
    fontSize: 22,
    textAlign:'center',
    marginTop: 70,
  }
});
