import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '../../helpers/SettingsProvider';

export default function OnboardingScreen({
    step,
    title,
    description,
    image,
    leftButtonText,
    leftButtonOnPress,
    rightButtonText,
    rightButtonOnPress
}) {
    const { theme } = useSettings();

    const styles = {
        safeArea: {
            flex: 1,
            backgroundColor: theme.secondary
        },
        content: {
            flexGrow: 1,
            paddingHorizontal: 22,
            paddingTop: 20,
            paddingBottom: 24
        },
        main: {
            flex: 1,
            alignItems: 'center'
        },
        step: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textSecondary,
            marginBottom: 16
        },
        title: {
            fontFamily: 'Nexa',
            fontSize: 30,
            lineHeight: 37,
            color: theme.textPrimary,
            textAlign: 'center'
        },
        description: {
            maxWidth: 520,
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 23,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 16
        },
        imageContainer: {
            width: '78%',
            maxWidth: 300,
            aspectRatio: 3 / 4,
            borderRadius: 18,
            backgroundColor: theme.background,
            overflow: 'hidden',
            marginTop: 28
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        },
        progress: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            marginTop: 22,
            marginBottom: 24
        },
        progressDot: {
            width: 9,
            height: 9,
            borderRadius: 5,
            backgroundColor: theme.tertiary
        },
        activeProgressDot: {
            width: 25,
            backgroundColor: theme.primary
        },
        buttons: {
            width: '100%',
            flexDirection: 'row',
            gap: 12
        },
        button: {
            flex: 1,
            minHeight: 56,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10
        },
        secondaryButton: {
            borderWidth: 1,
            borderColor: theme.primary,
            backgroundColor: theme.secondary
        },
        buttonText: {
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 20,
            textAlign: 'center'
        },
        secondaryButtonText: {
            color: theme.primary
        },
        primaryButton: {
            backgroundColor: theme.primary
        },
        primaryButtonText: {
            color: theme.textHeader
        }
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.main}>
                    <Text style={styles.step}>{step} / 3</Text>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.imageContainer}>
                        <Image fadeDuration={0} source={image} style={styles.image} />
                    </View>
                </View>

                <View style={styles.progress}>
                    {[1, 2, 3].map(item => (
                        <View
                            key={item}
                            style={[styles.progressDot, item === step && styles.activeProgressDot]}
                        />
                    ))}
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        activeOpacity={0.8}
                        onPress={leftButtonOnPress}
                    >
                        <Text style={[styles.buttonText, styles.secondaryButtonText]}>{leftButtonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        activeOpacity={0.8}
                        onPress={rightButtonOnPress}
                    >
                        <Text style={[styles.buttonText, styles.primaryButtonText]}>{rightButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}