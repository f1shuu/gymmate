import { useNavigation } from '@react-navigation/native';

import OnboardingScreen from './OnboardingScreen';

import { useSettings } from '../../helpers/SettingsProvider';

export default function TrainingOnboardingScreen() {
    const { translate } = useSettings();
    const navigation = useNavigation();

    return (
        <OnboardingScreen
            step={2}
            title={translate('onboardingTrainingsTitle')}
            description={translate('onboardingTrainingsDescription')}
            image={require('../../assets/images/intro/plan-trainings.png')}
            leftButtonText={translate('back')}
            leftButtonOnPress={() => navigation.goBack()}
            rightButtonText={translate('next')}
            rightButtonOnPress={() => navigation.navigate('ToolsOnboardingScreen')}
        />
    )
}