import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Linking,
    PermissionsAndroid,
} from 'react-native';
import { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';

type Props = {
    isDarkMode: boolean
}

export const DownloadInput = ({isDarkMode}: Props) => {

    const [inputCode, setInputCode] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    
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
        } catch (err) {
          console.warn(err);
        }
    };

    const handleDownloadFile = async () => {
        setInputCode('');
        if(inputCode.length !== 6) {
            setErrorMsg('Enter a Valid Code');
        } else {
            await requestStoragePermission();
            const fileURL = `https://files-fly-server-mobile.onrender.com/download/${inputCode}`;
            const { config, fs } = RNFetchBlob;
            const date = new Date();
            try {
                const filePath = fs.dirs.DownloadDir;
                config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: filePath + "/download_" + Math.floor(date.getDate() + date.getSeconds()),
                    description: 'File Download',
                },
                }).fetch('GET', fileURL)
                    .then((res) => {
                        alert("File Downloaded Successfully");
                    });
                // The file is now downloaded, and you can use `res.path()` to get the local path.
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }
    }

    const handleInputCode = (text: string) => {
        setErrorMsg('');
        setInputCode(text);
    };    

    return (
        <View>

            <Text style={[styles.text, {
                color: isDarkMode ? 'white' : 'black'
            }]}>Download File</Text>

            <TextInput 
                style={[styles.input, {
                    color: isDarkMode ? 'white' : 'black'
                }]}
                onChangeText={handleInputCode}
                placeholder="Enter 6-digit Code"
                placeholderTextColor={isDarkMode ? 'white' : "#000"}
                value={inputCode}
            />

            <View style={styles.btn} >
                <Button
                    title='Download File'
                    onPress={handleDownloadFile}
                />
            </View>

            {
                errorMsg !== '' && 
                <Text style={[styles.err, {
                    color: isDarkMode ? 'white' : 'black'
                }]}>{errorMsg}</Text>
            }

        </View>
  )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        marginTop: 50,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
    }
});