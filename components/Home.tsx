import { 
    SafeAreaView, 
    Text, 
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import { useState, useEffect, useRef } from 'react';
  import { FileInput } from './FileInput';
  import BottomSheet from 'react-native-simple-bottom-sheet';
  
  const Home = () => {
    
    const [code, setCode] = useState<String>('');
    const [spinner, setSpinner] = useState<boolean>(false);
    const [isFilePicked , setIsFilePicked] = useState<boolean>(false);
    const [fileName, setFileName] = useState<String | null>(null);
    const panelRef = useRef<any>(null);
  
    const formatFileName = (name : String) => {
      if (name && name.length > 30) {
        const firstPart = name.substring(0, 10);
        const fileExtension = name.split('.').pop();
        return `${firstPart}.${fileExtension}`;
      }
      return name;
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
          fileName !== null && 
          <Text style={styles.fileInfo}>
            {formatFileName(fileName)}
          </Text>
        }
  
        {
          spinner ? 
          <ActivityIndicator size='large' color={'midnightblue'} /> :
          <FileInput
          setCode={setCode}
          setSpinner={setSpinner}
          isFilePicked={isFilePicked}
          setIsFilePicked={setIsFilePicked}
          setFileName={setFileName}
        />
        }

        {
          code !== '' && 
          <BottomSheet ref={ref => panelRef.current = ref}>
            <Text style={styles.bottomSheet}>
              file code: {code}
            </Text>
          </BottomSheet>
        }
  
      </SafeAreaView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    appBackgroundColor: {
      flex: 1,
    },
    fileInfo: {
      fontSize: 22,
      textAlign:'center',
      marginTop: 40,
      color: 'black',
    },
    bottomSheet: {
      paddingVertical: 20,
      fontSize: 28,
      color: 'black',
    },
  });