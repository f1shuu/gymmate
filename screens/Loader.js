import { useEffect } from 'react';
import { View, Image } from 'react-native';

export default function Loader({ navigation }) {
    useEffect(() => {
        const gifTimeout = setTimeout(() => {
            navigation.navigate('NavigationBar');
        }, 2500);

        return () => clearTimeout(gifTimeout);
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#212121', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('../assets/splash.gif')}
                style={{ resizeMode: 'center' }}
            />
        </View>
    );
}