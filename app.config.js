export default {
    expo: {
        name: 'GymMate',
        slug: 'GymMate',
        version: '1.3.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        splash: {
            image: './assets/images/splash.png',
            backgroundColor: '#3533CD'
        },
        assetBundlePatterns: ['assets/*'],
        android: {
            package: 'com.f1shu.gymmate',
            softwareKeyboardLayoutMode: 'pan'
        },
        extra: {
            eas: {
                projectId: 'e5304711-7af6-4e07-9af3-2c40c094c484'
            }
        },
        plugins: [
            'expo-font',
            'expo-audio',
            'expo-asset',
            'expo-localization',
            'expo-notifications',
            [
                'expo-image-picker',
                {
                    photosPermission: 'Zezwól GymMate na wybór zdjęcia profilowego. / Allow GymMate to select a profile photo.'
                }
            ],
            '@react-native-community/datetimepicker'
        ],
        newArchEnabled: true
    }
}