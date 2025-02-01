import Container from '../../components/Container';
import Tool from '../../components/widgets/Tool';

export default function ToolsScreen() {
    return (
        <Container gradient={0.75}>
            <Tool name='Minutnik' url={require('../../assets/images/tools/timer.png')} onPress='Timer' />
            <Tool name='Kalkulator BMI' url={require('../../assets/images/tools/bmi.png')} onPress='BMICalculator' />
            <Tool name='Kalkulator matematyczny' url={require('../../assets/images/tools/calculator.png')} onPress='Calculator' />
        </Container>
    )
}