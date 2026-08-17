import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import { muscleGroups } from '../../constants/muscleGroups';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isExercises, setIsExercises] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [activeId, setActiveId] = useState(null);

    const { settings, theme, translate } = useSettings();
    const navigation = useNavigation();
    const language = settings.language || 'en';
    const localizedMuscleGroups = muscleGroups[language] || muscleGroups.en || [];

    const translateDomainValue = (value) => {
        if (Array.isArray(value)) return value.map(translateDomainValue).join(', ');
        if (value === 'reps_based') return translate('repsBased');
        if (value === 'time_based') return translate('timeBased');
        return localizedMuscleGroups.find(group => group.value === value)?.label || translate(value);
    }

    const hasDisplayValue = (value) => Array.isArray(value) ? value.length > 0 : Boolean(value);
    const filteredExercises = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLocaleLowerCase(language);
        return exercises
            .map((exercise, index) => ({ exercise, index }))
            .filter(({ exercise }) => exercise.name?.toLocaleLowerCase(language).includes(normalizedQuery))
            .sort((first, second) => {
                const firstFavorite = Boolean(first.exercise.isFavorite);
                const secondFavorite = Boolean(second.exercise.isFavorite);
                if (firstFavorite !== secondFavorite) return firstFavorite ? -1 : 1;
                if (firstFavorite) return first.index - second.index;
                return (first.exercise.name || '').localeCompare(second.exercise.name || '', language, { sensitivity: 'base' });
            })
            .map(({ exercise }) => exercise)
    }, [exercises, language, searchQuery])

    useFocusEffect(
        useCallback(() => {
            const fetchExercises = async () => {
                await DataController.get('exercises', setExercises, setIsExercises);
            }
            fetchExercises();
        }, [])
    )

    const handleModal = (id) => {
        setModalData(id);
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
        setIsModalVisible(!isModalVisible);
    }

    const toggleFavorite = async (exercise) => {
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(console.error);
        const updatedExercises = await DataController.setExerciseFavorite(exercise.id, !exercise.isFavorite);
        if (updatedExercises) setExercises(updatedExercises);
    }

    const Exercise = ({ item }) => {
        const isActive = activeId === item.id;

        return (
            <View>
                <View style={[styles.header, isActive && styles.expandedHeader]}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        accessibilityRole='button'
                        accessibilityLabel={item.isFavorite ? translate('removeFromFavorites') : translate('addToFavorites')}
                        onPress={() => toggleFavorite(item)}
                    >
                        <Icon name={item.isFavorite ? 'star' : 'star-border'} size={26} color={item.isFavorite ? theme.primary : theme.tertiary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerMain}
                        onPress={() => setActiveId(activeId === item.id ? null : item.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.headerText}>{item.name}</Text>
                        <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={32} color={theme.textPrimary} />
                    </TouchableOpacity>
                </View>
                {isActive ? (
                    <View style={styles.exercise}>
                        {Object.entries(item.data).map(([key, value]) => (
                            hasDisplayValue(value) ? (
                                <View key={key} style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>{translate(key)}:</Text>
                                    <Text style={styles.detailValue}>{translateDomainValue(value)}</Text>
                                </View>
                            ) : null
                        ))}
                        <View style={styles.actions}>
                            <Button onPress={async () => await DataController.update('exercises', item.id, navigation, 'ExerciseCreator')} text={translate('edit')} />
                            <Button onPress={() => handleModal(item.id)} text={translate('delete')} type='delete' />
                        </View>
                    </View>
                ) : null}
            </View>
        )
    }

    const styles = {
        header: {
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            gap: 10,
            paddingHorizontal: 10,
            marginBottom: 5
        },
        expandedHeader: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginBottom: 0
        },
        headerMain: {
            flex: 1,
            minHeight: 52,
            flexDirection: 'row',
            alignItems: 'center'
        },
        headerText: {
            flex: 1,
            marginRight: 8,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        exercise: {
            flexDirection: 'column',
            marginBottom: 5,
            backgroundColor: theme.background,
            padding: 15,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingVertical: 2,
            gap: 15
        },
        detailLabel: {
            maxWidth: '45%',
            flexShrink: 0,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        detailValue: {
            flex: 1,
            flexShrink: 1,
            fontFamily: 'Nexa',
            fontSize: 16,
            lineHeight: 22,
            color: theme.textPrimary,
            textAlign: 'right'
        },
        actions: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            gap: 15
        },
        searchContainer: {
            height: 54,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.background,
            borderRadius: 10,
            paddingHorizontal: 15,
            marginVertical: 15
        },
        searchInput: {
            flex: 1,
            height: '100%',
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textPrimary,
            marginLeft: 10
        },
        noResults: {
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 22,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 30,
            paddingHorizontal: 20
        }
    }

    return (
        <Container isMainScreen={true}>
            {isExercises ? (
                <>
                    <View style={styles.searchContainer}>
                        <Icon name='search' size={24} color={theme.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder={translate('searchExercises')}
                            placeholderTextColor={theme.textSecondary}
                            returnKeyType='search'
                            autoCorrect={false}
                        />
                        {searchQuery ? (
                            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.8}>
                                <Icon name='close' size={22} color={theme.textSecondary} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    <FlatList
                        data={filteredExercises}
                        renderItem={({ item }) => <Exercise item={item} />}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps='handled'
                        ListEmptyComponent={<Text style={styles.noResults}>{translate('noExercisesFound')}</Text>}
                    />
                </>
            ) : (
                <Background text={true} content={translate('exercisesDeclined')} type='feminine' />
            )}
            <AddButton onPress='ExerciseCreator' />
            <Modal
                isVisible={isModalVisible}
                text={translate('areYouSure') + translate('thisExercise') + '?'}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={async () => await DataController.delete('exercises', setExercises, setIsExercises, modalData, isModalVisible, setIsModalVisible)}
                buttonTwoText={translate('no')}
                buttonTwoOnPress={() => setIsModalVisible(!isModalVisible)}
            />
        </Container>
    )
}