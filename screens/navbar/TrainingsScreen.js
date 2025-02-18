import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Container from '../../components/Container';

import { useSettings } from '../../providers/SettingsProvider';

export default function TrainingsScreen() {
    const { translate } = useSettings();

    return (
        <Container gradient={0.75}>
            <Background text={true} content={translate('trainings')} type='masculine' />
            <AddButton onPress='TrainingsCreator' />
        </Container>
    )
}
