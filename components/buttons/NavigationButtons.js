import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';

export default function NavigationButtons({ isFirst, isLast, firstOnPress, secondOnPress, passedParameter }) {
    const navigation = useNavigation();

    return (
        <>
            {isFirst ? (
                <View style={{ marginVertical: 25 }} >
                    <Button onPress={() => { navigation.navigate(firstOnPress, { type: passedParameter }) }} text='Dalej' />
                </View>
            ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 25 }}>
                    <Button onPress={() => { navigation.navigate(firstOnPress) }} text='Wstecz' />
                    <Button onPress={() => { navigation.navigate(secondOnPress, { type: passedParameter }) }} text={isLast ? 'Zapisz' : 'Dalej'} />
                </View>
            )}
        </>
    )
}