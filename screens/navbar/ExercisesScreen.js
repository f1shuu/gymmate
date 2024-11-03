import Container from '../../components/Container';
import Background from '../../components/Background';
import AddButton from '../../components/buttons/AddButton';

export default function ExercisesScreen() {
    return (
        <Container>
            <Background text={true} content={'ćwiczeń'} type={'feminine'} />
            <AddButton onPress={'AddExercise'} />
        </Container>
    )
}