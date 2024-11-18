import { Text, Image } from 'react-native';

import Colors from '../Colors';

export default function Background({ text, content, type }) {
    return (
        <>
            {text ? (<Text style={styles.text}>Nie masz jeszcze żadnych {content}. Użyj przycisku w prawym dolnym rogu ekranu, aby dodać {type === 'masculine' ? 'swój pierwszy' : 'swoje pierwsze'}.</Text>) : null}
            <Image source={require('../assets/images/background.png')} style={styles.image} />
        </>
    )
}

const styles = {
    text: {
        fontFamily: 'Nexa',
        fontSize: 32,
        color: Colors.secondary,
        textAlign: 'center',
        paddingTop: 25,
        paddingHorizontal: 25
    },
    image: {
        zIndex: 0,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90
    }
}