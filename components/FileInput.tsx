import {
    View,
    Button,
    StyleSheet,
    Text,
  } from 'react-native';
  import React from 'react';
  import DocumentPicker from "react-native-document-picker";
  import { useState, useEffect } from 'react';
  
  type Props = {
    setCode: (fileId: String) => void;
    setSpinner: (spinner: boolean) => void;
    isFilePicked: boolean
    setIsFilePicked: (isFilePicked: boolean) => void;
  }
  
  export const FileInput = ({setCode, setSpinner, isFilePicked, setIsFilePicked}: Props) => {
  
    const [limitMsg, setLimitMsg] = useState<boolean>(false);
    const [isServerOverloaded , setIsServerOverloaded] = useState<boolean>(false);

    const handleFileUpload = async () => {
      try {
        setCode('');
        setLimitMsg(false);
        const document = await DocumentPicker.pickSingle();
        if (document && document.size) {
          const maxSizeBytes = 201 * 1024 * 1024; // 200 MB in bytes
          if (document.size >= maxSizeBytes) {
            setLimitMsg(true);
            return;
          }
        } else {
          console.warn("Invalid or null document");
          return;
        }
        setSpinner(true);
        const formData = new FormData();
        formData.append('file', {
          uri: document.uri,
          type: document.type,
          name: document.name,
        });
        setIsFilePicked(true);
        const response = await fetch('https://files-fly-server-mobile.onrender.com/post',{
          method: 'POST',
          body: formData
        });
        const responseData = await response.json();
        setCode(responseData.fileId);
      } catch (error) {
        if(isFilePicked) {
          setIsServerOverloaded(true);
        }
        console.error(error);
      }
    };

    useEffect(() => {

      if (isServerOverloaded) {

        const reloadTimeout = setTimeout(() => {
          setIsServerOverloaded(false);
        }, 5000); // 5 seconds
  
        return () => clearTimeout(reloadTimeout);
      }

    }, [isServerOverloaded]);

    return (
      <View style={ styles.btn }>
  
        <Button 
          title='Upload Document 📑 (max 200 mb)'
          onPress={handleFileUpload}
          />

        {
          limitMsg && 
          <Text style={styles.err}>
            File Upload Limit Exceeded !!!
          </Text>
        }

        {
          isServerOverloaded && 
          <Text style={styles.err}>
            Server is Overloaded, Try Again in Sometime ...
          </Text>
        }

      </View>
    )
  };
  
  const styles = StyleSheet.create({
    btn: {
      marginTop: 100,
      marginLeft: 25,
      marginRight: 25,
    },
    err:{
      fontSize: 22,
        textAlign: 'center',
        marginTop: 50,
        color: 'red',
    }
  });