import { Text, View } from 'react-native';

import Colors from '../Colors';

export default function Background({ text, content, type }) {
    return (
        <View style={styles.container}>
            {text ? (<Text style={styles.text}>Nie masz jeszcze żadnych {content}. Użyj przycisku w prawym dolnym rogu ekranu, aby dodać {type === 'masculine' ? 'swój pierwszy' : 'swoje pierwsze'}.</Text>) : null}
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 24,
        color: Colors.secondary,
        textAlign: 'center',
        paddingHorizontal: 25,
        paddingBottom: 100
    }
}