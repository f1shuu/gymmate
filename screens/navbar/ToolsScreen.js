import Container from '../../components/Container';
import Tool from '../../components/widgets/Tool';

import { useSettings } from '../../providers/SettingsProvider';

export default function ToolsScreen() {
    const { translate } = useSettings();

    return (
        <Container gradient={0.75}>
            <Tool name={translate('timer')} url={require('../../assets/images/tools/timer.png')} onPress='Timer' />
            <Tool name={translate('bmiCalculator')} url={require('../../assets/images/tools/bmi.png')} onPress='BMICalculator' />
            <Tool name={translate('calculator')} url={require('../../assets/images/tools/calculator.png')} onPress='Calculator' />
        </Container>
    )
}