import { useNavigation } from '@react-navigation/native';

import OnboardingScreen from './OnboardingScreen';

import { useSettings } from '../../helpers/SettingsProvider';

export default function ExerciseOnboardingScreen() {
    const { completeOnboarding, translate } = useSettings();
    const navigation = useNavigation();

    const finishOnboarding = async () => {
        if (!await completeOnboarding()) return;
        navigation.reset({ index: 0, routes: [{ name: 'NavigationBar' }] });
    }

    return (
        <OnboardingScreen
            step={1}
            title={translate('onboardingExercisesTitle')}
            description={translate('onboardingExercisesDescription')}
            image={require('../../assets/images/intro/create-exercises.png')}
            leftButtonText={translate('skip')}
            leftButtonOnPress={finishOnboarding}
            rightButtonText={translate('next')}
            rightButtonOnPress={() => navigation.navigate('TrainingOnboardingScreen')}
        />
    )
}