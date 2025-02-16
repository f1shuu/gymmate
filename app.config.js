export default {
    expo: {
        name: 'GymMate',
        slug: 'GymMate',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        splash: {
            image: './assets/images/splash.png',
            backgroundColor: '#3533CD'
        },
        assetBundlePatterns: ['assets/*'],
        android: {
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                }
            },
            package: 'com.f1shu.gymmate',
            permissions: ['ACCESS_FINE_LOCATION'],
            softwareKeyboardLayoutMode: 'pan'
        },
        extra: {
            eas: {
                projectId: 'e5304711-7af6-4e07-9af3-2c40c094c484'
            }
        },
        plugins: ['expo-font'],
        newArchEnabled: true
    }
}
