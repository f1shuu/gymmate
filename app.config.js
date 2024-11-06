import { config } from 'dotenv';
config();

export default {
    expo: {
        name: 'GymMate',
        slug: 'GymMate',
        version: '0.8.0',
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
                    apiKey: process.env.GOOGLE_MAPS_API_KEY
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
                projectId: process.env.PROJECT_ID
            }
        },
        plugins: ['expo-font']
    }
};
