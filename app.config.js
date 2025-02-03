export default {
    expo: {
        name: 'GymMate',
        slug: 'GymMate',
        version: '0.9.6',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'cover',
            backgroundColor: '#000000'
        },
        assetBundlePatterns: ['assets/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/icon.png',
                backgroundColor: '#ffffff'
            },
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                }
            },
            package: 'com.f1shu.gymmate',
            permissions: ['ACCESS_FINE_LOCATION'],
            softwareKeyboardLayoutMode: 'pan'
        },
        web: {
            favicon: './assets/icon.png'
        },
        extra: {
            eas: {
                projectId: 'e5304711-7af6-4e07-9af3-2c40c094c484'
            }
        },
        plugins: ['expo-font'],
        newArchEnabled: true
    }
};
