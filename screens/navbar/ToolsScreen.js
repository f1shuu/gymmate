import Tool from '../../components/widgets/Tool';
import Container from '../../components/Container';
import Background from '../../components/Background';

export default function ToolsScreen() {
    return (
        <Container>
            <Background text={false} />
            <Tool name='Minutnik' url={require('../../assets/images/tools/timer.png')} onPress={'Timer'} />
            <Tool name='Kalkulator BMI' url={require('../../assets/images/tools/bmi.png')} onPress={'BMICalculator'} />
            <Tool name='Kalkulator matematyczny' url={require('../../assets/images/tools/calculator.png')} onPress={'Calculator'} />
        </Container>
    )
}