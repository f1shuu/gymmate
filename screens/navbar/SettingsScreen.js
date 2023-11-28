import { View, StyleSheet, ScrollView } from 'react-native';

import Setting from '../../components/widgets/Setting';

export default function SettingsScreen() {
    return (
        <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Setting name='Ustawienie 1' />
                <Setting name='Ustawienie 2' />
                <Setting name='Ustawienie 3' />
                <Setting name='Ustawienie 4' />
                <Setting name='Ustawienie 5' />
                <Setting name='Ustawienie 6' />
                <Setting name='Ustawienie 7' />
                <Setting name='Ustawienie 8' />
                <Setting name='Ustawienie 9' />
                <Setting name='Ustawienie 10' />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1
    }
})