import { View } from 'react-native';

import Colors from '../Colors';

export default function Container({ children }) {
    return <View style={styles.container}>{children}</View>
}

const styles = ({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10
    }
})