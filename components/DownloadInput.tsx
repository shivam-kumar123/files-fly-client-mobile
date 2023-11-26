import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Linking
} from 'react-native';
import { useState } from 'react';

type Props = {
    isDarkMode: boolean
}

export const DownloadInput = ({isDarkMode}: Props) => {

    const [inputCode, setInputCode] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    
    const handleDownloadFile = async () => {
        setInputCode('');
        if(inputCode.length !== 6) {
            setErrorMsg('Enter a Valid Code');
        } else {
            const fileURL = `https://files-fly-server-mobile.onrender.com/download/${inputCode}`;
            Linking.openURL(fileURL).catch((err) => console.error('Error opening URL:', err));
        };
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