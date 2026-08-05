import { useNavigation } from '@react-navigation/native';

import OnboardingScreen from './OnboardingScreen';

import { useSettings } from '../../helpers/SettingsProvider';

export default function ToolsOnboardingScreen() {
    const { completeOnboarding, translate } = useSettings();
    const navigation = useNavigation();

    const finishOnboarding = async () => {
        if (!await completeOnboarding()) return;
        navigation.reset({ index: 0, routes: [{ name: 'NavigationBar' }] });
    }

    return (
        <OnboardingScreen
            step={3}
            title={translate('onboardingToolsTitle')}
            description={translate('onboardingToolsDescription')}
            image={require('../../assets/images/intro/use-tools.png')}
            leftButtonText={translate('back')}
            leftButtonOnPress={() => navigation.goBack()}
            rightButtonText={translate('enterApp')}
            rightButtonOnPress={finishOnboarding}
        />
    )
}