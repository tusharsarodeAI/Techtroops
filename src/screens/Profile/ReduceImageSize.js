import ImageResizer from 'react-native-image-resizer';

export default function ReduceImageSize(image) {
    let newWidth = 40;
    let newHeight = 40;
    let compressFormat = 'PNG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
    let imageUri = image;
    console.log(imageUri)
    ImageResizer.createResizedImage(
        imageUri,
        newWidth,
        newHeight,
        compressFormat,
        quality,
        rotation,
        outputPath,
    )
        .then((response) => {
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            //resized image uri
            let uri = response.uri;
            //generating image name
            //to resolve file path issue on different platforms
            //setting the image name and image uri in the state
            return (uri)
        })
        .catch((err) => {
            console.log('image resizing error => ', err);
        });
}