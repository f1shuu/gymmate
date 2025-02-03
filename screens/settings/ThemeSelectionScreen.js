import { FlatList } from 'react-native';

import Container from '../../components/Container';
import Theme from '../../components/widgets/Theme';
import * as themes from '../../Themes';
import { useTheme } from '../../providers/ThemeProvider';

const data = Object.keys(themes);

export default function ThemeSelectionScreen() {
    const { theme, changeTheme } = useTheme();

    return (
        <Container>
            <FlatList
                data={data}
                style={{ margin: -5 }}
                keyExtractor={(item) => item}
                numColumns={3}
                renderItem={({ item }) => (
                    <Theme name={item} primaryColor={themes[item].primary} secondaryColor={themes[item].secondary} textColor={themes[item].textPrimary} onPress={() => changeTheme(item)} />
                )}
            />
        </Container>
    );
};
