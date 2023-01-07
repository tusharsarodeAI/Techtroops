import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import color from '../../constant/color';
import ReduceImageSize from './ReduceImageSize';
export default function GetImage(props) {
    const [image, setImage] = useState('https://image.flaticon.com/icons/png/512/149/149071.png');
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        props.setimage(result.uri); //passing image back to edit profile
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View>
            <View style={styles.pic}>
                {image && <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: image,
                    }}
                />}
                <Button title="Choose Image"
                    onPress={pickImage}
                    color={color.PRIMARY_COLOR}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        pic: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20
        },
        tinyLogo: {
            margin: 5,
            height: 130,
            width: 130,
            borderRadius: 500
        }
    }
)