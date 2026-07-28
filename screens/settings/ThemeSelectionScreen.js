import { FlatList } from 'react-native';

import Container from '../../components/Container';
import Theme from '../../components/widgets/Theme';
import * as themes from '../../Themes';

import { useSettings } from '../../helpers/SettingsProvider';

const data = Object.keys(themes);

export default function ThemeSelectionScreen() {
    const { changeTheme, theme } = useSettings();

    return (
        <Container>
            <FlatList
                data={data}
                style={{ margin: -5 }}
                keyExtractor={(item) => item}
                numColumns={3}
                renderItem={({ item }) => (
                    <Theme name={item} primaryColor={themes[item].primary} secondaryColor={themes[item].secondary} textColor={themes[item].textPrimary} selected={theme === themes[item]} onPress={() => changeTheme(item)} />
                )}
            />
        </Container>
    )
}